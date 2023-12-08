package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.TagDto;
import com.example.demo.entity.FeedbackEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.QuestionEntity;
import com.example.demo.entity.TagEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserPostEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.service.CategoryService;
import com.example.demo.service.FeedbackService;
import com.example.demo.service.PostQuestionService;
import com.example.demo.service.PostService;
import com.example.demo.service.QuestionService;
import com.example.demo.service.TagPostService;
import com.example.demo.service.TagService;
import com.example.demo.service.UserPostService;
import com.example.demo.service.UserService;
import com.example.demo.thanh.dto.FeedbackDto;
import com.example.demo.thanh.dto.LessonDto;
import com.example.demo.thanh.dto.QuestionDto;
import com.example.demo.thanh.service.HttpRequestService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/lesson")
public class LessonController {
	@Autowired
	private PostService postService;

	@Autowired
	private CategoryService cateService;

	@Autowired
	private UserPostService userPostService;

	@Autowired
	private FeedbackService feedbackService;

	@Autowired
	private QuestionService questionService;

	@Autowired
	private QuestionRepository questionRepo;

	@Autowired
	private TagService tagService;

	@Autowired
	private UserService userService;

	@Autowired
	private TagPostService tagpostService;

	@Autowired
	private PostQuestionService postquestionService;

	@GetMapping("/list")
	public ResponseEntity<List<LessonDto>> getAllLesson() {
		try {
			List<PostEntity> lessonPosts = postService.getPostsByTypeAndNotDeleted("lesson");
			List<LessonDto> lessonPostDtos = lessonPosts.stream().map(lesson -> {
				String cateName = (lesson.getCategory() != null) ? lesson.getCategory().getCategoryName()
						: "Uncategory";
				String authorName = (lesson.getUser() != null) ? lesson.getUser().getName() : "Anonymous";
				return new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getTitle(),
						lesson.getContent(), lesson.getPrice(),
						lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
						lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName,
						lesson.getCreatedAt(), lesson.getUpdatedAt());

			}).collect(Collectors.toList());
			return new ResponseEntity<>(lessonPostDtos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("dashboard/list")
	public ResponseEntity<List<LessonDto>> getAllLessonDashboard(HttpServletRequest request) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			int userId = userService.getUserByEmail(useEmail).getUserId();
			List<PostEntity> lessonPosts = new ArrayList<PostEntity>();
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				lessonPosts = postService.getPostsByTypeAndNotDeleted("lesson");
			} else
				lessonPosts = postService.getPostsByTypeByUserIdAndNotDeleted(userId, "lesson");
			List<LessonDto> lessonPostDtos = lessonPosts.stream().map(lesson -> {
				String cateName = (lesson.getCategory() != null) ? lesson.getCategory().getCategoryName()
						: "Uncategory";
				String authorName = (lesson.getUser() != null) ? lesson.getUser().getName() : "Anonymous";
				return new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getTitle(),
						lesson.getContent(), lesson.getPrice(),
						lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
						lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName,
						lesson.getCreatedAt(), lesson.getUpdatedAt());

			}).collect(Collectors.toList());
			return new ResponseEntity<>(lessonPostDtos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<PostEntity> createLesson(@PathVariable int lessonId) {
		try {
			PostEntity lesson = postService.getPostById(lessonId);
			return new ResponseEntity<>(lesson, HttpStatus.OK);
		} catch (Exception e) {
			// trả về message lỗi server khi nhận status 500 này
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{userId}/{lessonId}")
	public ResponseEntity<LessonDto> getLessonByIdAndUserId(@PathVariable int userId, @PathVariable int lessonId) {
		try {
			PostEntity lesson = postService.getPostById(lessonId);
			if (lesson == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			String cateName = (lesson.getCategory() != null) ? lesson.getCategory().getCategoryName() : "Uncategory";
			String authorName = (lesson.getUser() != null) ? lesson.getUser().getName() : "Anonymous";
			// feedbacks
			List<FeedbackDto> feedbackDtos = new ArrayList<>();
			List<FeedbackEntity> feedbacks = feedbackService.getFeedbacksByPostId(lessonId);
			if (feedbacks != null && !feedbacks.isEmpty()) {
				feedbackDtos = feedbacks.stream()
						.map(feedback -> new FeedbackDto(feedback.getFeedbackId(), feedback.getContent(),
								feedback.getUser() != null ? feedback.getUser().getName() : "Anonymous",
								feedback.getCreatedAt()))
						.collect(Collectors.toList());
			}
			// tags
			List<TagDto> tagDtos = new ArrayList<>();
			List<TagEntity> tags = tagService.allTagByPostId(lessonId);
			tagDtos = tags.stream().map(tag -> new TagDto(tag.getTagId(), tag.getTagName()))
					.collect(Collectors.toList());
			// questions
			List<QuestionDto> questionDtos = new ArrayList<>();
			List<QuestionEntity> questions = questionService.getQuestionsByPostId(lessonId);
			if (questions != null && !questions.isEmpty()) {
				questionDtos = questions.stream()
						.map(question -> new QuestionDto(question.getQuestionId(), question.getContent(),
								question.getAnswerA(), question.getAnswerB(), question.getAnswerC(),
								question.getAnswerD()))
						.collect(Collectors.toList());
			}

			// check the user payed or not refunded
			UserPostEntity userBuy = userPostService.UserPayPost(userId, lessonId);
			if (userBuy != null) {
				LessonDto lessonDto = new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getVideo(),
						lesson.getPrice(), lesson.getPrize(), lesson.getTitle(), lesson.getContent(),
						lesson.getCreatedAt(), lesson.getUpdatedAt(), lesson.getDeletedAt(),
						lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
						lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName,
						questionDtos, feedbackDtos, tagDtos);
				return new ResponseEntity<>(lessonDto, HttpStatus.OK);
			} else {
				LessonDto lessonDto = new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getPrice(),
						lesson.getTitle(), lesson.getContent(), lesson.getCreatedAt(), lesson.getUpdatedAt(),
						lesson.getDeletedAt(), lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
						lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName,
						feedbackDtos, tagDtos);
				return new ResponseEntity<>(lessonDto, HttpStatus.OK);
			}

		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// trả về message lỗi server khi nhận status 500 này
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/my-lesson/{userId}")
	public ResponseEntity<?> getMyLessonById(@PathVariable int userId) {
		try {
			List<PostEntity> lessonPosts = userPostService.findUserBoughtLesson(userId);
			if (lessonPosts.isEmpty()) {
				return new ResponseEntity<>("You haven't bought any course yet!", HttpStatus.NOT_FOUND);
			}
			List<LessonDto> lessonPostDtos = lessonPosts.stream().map(lesson -> {
				String cateName = (lesson.getCategory() != null) ? lesson.getCategory().getCategoryName()
						: "Uncategory";
				String authorName = (lesson.getUser() != null) ? lesson.getUser().getName() : "Anonymous";
				return new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getTitle(),
						lesson.getContent(), lesson.getPrice(),
						lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
						lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName,
						lesson.getCreatedAt(), lesson.getUpdatedAt());

			}).collect(Collectors.toList());
			return new ResponseEntity<>(lessonPostDtos, HttpStatus.OK);
		} catch (Exception e) {
			// trả về message lỗi server khi nhận status 500 này
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("dashboard/{lessonId}")
	public ResponseEntity<LessonDto> getLessonByIdDashboard(HttpServletRequest request, @PathVariable int lessonId) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			int userId = userService.getUserByEmail(useEmail).getUserId();
			PostEntity lesson = postService.getPostById(lessonId);
			if (HttpRequestService.hasRole(request, "ADMIN") || lesson.getUser().getUserId() == userId) {
				String cateName = (lesson.getCategory() != null) ? lesson.getCategory().getCategoryName()
						: "Uncategory";
				String authorName = (lesson.getUser() != null) ? lesson.getUser().getName() : "Anonymous";

				List<FeedbackDto> feedbackDtos = new ArrayList<>();
				List<FeedbackEntity> feedbacks = feedbackService.getFeedbacksByPostId(lessonId);
				if (feedbacks != null && !feedbacks.isEmpty()) {
					feedbackDtos = feedbacks.stream()
							.map(feedback -> new FeedbackDto(feedback.getFeedbackId(), feedback.getContent(),
									feedback.getUser() != null ? feedback.getUser().getName() : "Anonymous",
									feedback.getCreatedAt()))
							.collect(Collectors.toList());
				}

				List<QuestionDto> questionDtos = new ArrayList<>();
				List<QuestionEntity> questions = questionService.getQuestionsByPostId(lessonId);
				if (questions != null && !questions.isEmpty()) {
					questionDtos = questions.stream()
							.map(question -> new QuestionDto(question.getQuestionId(), question.getContent(),
									question.getAnswerA(), question.getAnswerB(), question.getAnswerC(),
									question.getAnswerD(), question.getRightAnswer()))
							.collect(Collectors.toList());
				}
				// tags
				List<TagDto> tagDtos = new ArrayList<>();
				List<TagEntity> tags = tagService.allTagByPostId(lessonId);
				tagDtos = tags.stream().map(tag -> new TagDto(tag.getTagId(), tag.getTagName()))
						.collect(Collectors.toList());
				LessonDto lessonDto = new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getVideo(),
						lesson.getPrice(), lesson.getPrize(), lesson.getTitle(), lesson.getContent(),
						lesson.getCreatedAt(), lesson.getUpdatedAt(), lesson.getDeletedAt(),
						lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
						lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName,
						questionDtos, feedbackDtos, tagDtos);
				return new ResponseEntity<>(lessonDto, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}

		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// trả về message lỗi server khi nhận status 500 này
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{lessonId}")
	public ResponseEntity<LessonDto> getLessonByIdAndUserId(@PathVariable int lessonId) {
		try {
			PostEntity lesson = postService.getPostById(lessonId);
			if (lesson == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			String cateName = (lesson.getCategory() != null) ? lesson.getCategory().getCategoryName() : "Uncategory";
			String authorName = (lesson.getUser() != null) ? lesson.getUser().getName() : "Anonymous";

			List<FeedbackDto> feedbackDtos = new ArrayList<>();
			List<FeedbackEntity> feedbacks = feedbackService.getFeedbacksByPostId(lessonId);
			if (feedbacks != null && !feedbacks.isEmpty()) {
				feedbackDtos = feedbacks.stream()
						.map(feedback -> new FeedbackDto(feedback.getFeedbackId(), feedback.getContent(),
								feedback.getUser() != null ? feedback.getUser().getName() : "Anonymous",
								feedback.getCreatedAt()))
						.collect(Collectors.toList());
			}
			// tags
			List<TagDto> tagDtos = new ArrayList<>();
			List<TagEntity> tags = tagService.allTagByPostId(lessonId);
			tagDtos = tags.stream().map(tag -> new TagDto(tag.getTagId(), tag.getTagName()))
					.collect(Collectors.toList());
			LessonDto lessonDto = new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getPrice(),
					lesson.getTitle(), lesson.getContent(), lesson.getCreatedAt(), lesson.getUpdatedAt(),
					lesson.getDeletedAt(), lesson.getUser() != null ? lesson.getUser().getUserId() : -1, authorName,
					lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1, cateName, feedbackDtos,
					tagDtos);
			return new ResponseEntity<>(lessonDto, HttpStatus.OK);

		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// trả về message lỗi server khi nhận status 500 này
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	@PostMapping("buy/{userId}/{lessonId}")
//	public ResponseEntity<LessonDto> buyLesson(@PathVariable int userId, @PathVariable int lessonId) {
//		try {
//			LessonDto lessonDto = new LessonDto();
//			UserPostEntity userBuy = userPostService.UserPayPost(userId, lessonId);
//			if (userBuy != null) {
//				lessonDto.setErrorMessage("You already bought this!");
//				return new ResponseEntity<>(lessonDto, HttpStatus.PAYMENT_REQUIRED);
//			} else {
//				return new ResponseEntity<>(lessonDto, HttpStatus.OK);
//			}
//
//		} catch (Exception e) {
//			// trả về message lỗi server khi nhận status 500 này
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	@DeleteMapping("/delete/{lessonId}")
	public ResponseEntity<?> deleteById(HttpServletRequest request, @PathVariable int lessonId) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			int userId = userService.getUserByEmail(useEmail).getUserId();
			PostEntity postEntity = postService.getPostById(lessonId);
			// check course have any owner
			UserPostEntity owner = userPostService.UserPayPost(userId, lessonId);
			if (owner != null) {
				return new ResponseEntity<>("This content already the owner", HttpStatus.UNAUTHORIZED);
			}

			if (HttpRequestService.hasRole(request, "ADMIN")) {
				postEntity.setDeletedAt(Timestamp.from(Instant.now()));
				postService.createPost(postEntity);
				return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
			} else if (HttpRequestService.hasRole(request, "TEACHER")) {
				if (postEntity.getUser().getUserId() == userId) {
					postEntity.setDeletedAt(Timestamp.from(Instant.now()));
					postService.createPost(postEntity);
					return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
				} else
					return new ResponseEntity<>("Do not allow to delete", HttpStatus.UNAUTHORIZED);
			} else
				return new ResponseEntity<>("Do not allow to delete, please login", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private static final String UPLOAD_DIRECTORY = "src/main/resources/static/uploads/";

	@PostMapping("/upload")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {

		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload");
		}

		try {
			byte[] bytes = file.getBytes();

			File uploadDir = new File(UPLOAD_DIRECTORY);
			if (!uploadDir.exists()) {
				uploadDir.mkdirs();
			}

			Path path = Paths.get(UPLOAD_DIRECTORY + file.getOriginalFilename());

			Files.write(path, bytes);

			return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully!");

		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file");
		}
	}

	@PutMapping("/add-tag")
	public ResponseEntity<?> updateTag(HttpServletRequest request, @RequestParam int lessonId,
			@RequestParam int tagId) {
		try {
			PostEntity postEntity = postService.getPostById(lessonId);
			TagEntity tagEntity = tagService.getTagById(tagId);
			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				boolean ok = tagpostService.addTagPost(postEntity, tagEntity);
				if (ok)
					return new ResponseEntity<>("Add tag: " + tagEntity.getTagName() + " for this lesson successfully",
							HttpStatus.OK);
				else
					return new ResponseEntity<>("Not found the tag or post", HttpStatus.OK);
			} else
				return new ResponseEntity<>("Do not allow to add tag for this lesson, please login",
						HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/remove-tag")
	public ResponseEntity<?> removeTag(HttpServletRequest request, @RequestParam int lessonId,
			@RequestParam int tagId) {
		try {
			TagEntity tagEntity = tagService.getTagById(tagId);
			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				boolean ok = tagpostService.removeTagPost(lessonId, tagId);
				if (ok)
					return new ResponseEntity<>(
							"Remove tag: " + tagEntity.getTagName() + " for this lesson successfully", HttpStatus.OK);
				else
					return new ResponseEntity<>("Not found the tag or post", HttpStatus.NOT_FOUND);
			} else
				return new ResponseEntity<>("Do not allow to remove tag for this lesson, please login",
						HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/remove-alltag")
	public ResponseEntity<?> removeAllTag(HttpServletRequest request, @RequestParam int lessonId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				boolean ok = tagpostService.removeAllTagsofPost(lessonId);
				if (ok)
					return new ResponseEntity<>("Remove all tags for this lesson successfully", HttpStatus.OK);
				else
					return new ResponseEntity<>("Not found the tag or post", HttpStatus.NOT_FOUND);
			} else
				return new ResponseEntity<>("Do not allow to remove tag for this lesson, please login",
						HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/update-add-question/{lessonId}")
	public ResponseEntity<?> updateAddQuestion(HttpServletRequest request, @RequestBody QuestionDto questionDto,
			@PathVariable int lessonId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				PostEntity postEntity = postService.getPostById(lessonId);
				QuestionEntity questionEntity = questionService.createOrUpdatePostQuestion(postEntity, questionDto);
				questionDto.setQuestionId(questionEntity.getQuestionId());
				return new ResponseEntity<>(questionDto, HttpStatus.OK);
			} else
				return new ResponseEntity<>("Do not allow to do this, please login", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-question/{lessonId}/{questionId}")
	public ResponseEntity<?> deleteQuestion(HttpServletRequest request, @PathVariable int lessonId,
			@PathVariable Long questionId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				// delete bang phu trc
				postquestionService.deleteAllPostQuestionByPostId(lessonId, questionId);
				questionRepo.deleteById(questionId);
				return new ResponseEntity<>("Delete OK", HttpStatus.OK);
			} else
				return new ResponseEntity<>("Do not allow to remove this, please login", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateLesson(HttpServletRequest request, @RequestBody LessonDto lessonDto) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			int userId = userService.getUserByEmail(useEmail).getUserId();
			PostEntity lesson = postService.getPostById(lessonDto.getId());
			if (HttpRequestService.hasRole(request, "ADMIN") || lesson.getUser().getUserId() == userId) {
				lesson.setTitle(lessonDto.getTitle());
				lesson.setCategory(cateService.getCategoryById(lessonDto.getCategoryId()));
				lesson.setPrice(lessonDto.getPrice());
				lesson.setPrize(lessonDto.getPrize());
				lesson.setContent(lessonDto.getContent());
				if (!lessonDto.getFeatureImage().isBlank())
					lesson.setFeatureImage(lessonDto.getFeatureImage());
				if (!lessonDto.getVideo().isBlank())
					lesson.setVideo(lessonDto.getVideo());
				postService.createPost(lesson);
				return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
			} else
				return new ResponseEntity<>("Do not allow to update this lesson, please login",
						HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-list")
	public ResponseEntity<?> deleteListLesson(HttpServletRequest request, @RequestBody List<Integer> listId) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			int userId = userService.getUserByEmail(useEmail).getUserId();
			String addMsg = "";
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				for (int i = 0; i < listId.size(); i++) {
					Integer postId = listId.get(i);
					PostEntity post = postService.getPostById(postId);
					// check course have any owner. It will terminate the loop
					UserPostEntity owner = userPostService.UserPayPost(userId, postId);
					if (owner != null) {
						addMsg = "Some content have owner will not deleled";
						return new ResponseEntity<>(addMsg, HttpStatus.UNAUTHORIZED);
					} else {
						post.setDeletedAt(Timestamp.from(Instant.now()));
						postService.createPost(post);
					}
				}
				return new ResponseEntity<>("Delete list successfully!", HttpStatus.OK);
			} else {
				for (int i = 0; i < listId.size(); i++) {
					Integer postId = listId.get(i);
					PostEntity post = postService.getPostById(postId);
					if (post.getUser().getUserId() == userId) {
						UserPostEntity owner = userPostService.UserPayPost(userId, postId);
						if (owner != null) {
							addMsg = "Some content have owner will not deleled";
							return new ResponseEntity<>(addMsg, HttpStatus.UNAUTHORIZED);
						} else {
							post.setDeletedAt(Timestamp.from(Instant.now()));
							postService.createPost(post);
						}
					} else
						return new ResponseEntity<>("Delete list successfully!", HttpStatus.OK);
				}
				return new ResponseEntity<>("Do not allow to delete the lesson!", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/add")
	public ResponseEntity<?> addLesson(HttpServletRequest request, @RequestBody LessonDto lessonDto) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity author = userService.getUserByEmail(useEmail);

			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				PostEntity lesson = new PostEntity();
				lesson.setType("lesson");
				lesson.setUser(author);
				lesson.setTitle(lessonDto.getTitle());
				lesson.setCategory(cateService.getCategoryById(lessonDto.getCategoryId()));
				lesson.setPrice(lessonDto.getPrice());
				lesson.setPrize(lessonDto.getPrize());
				lesson.setContent(lessonDto.getContent());
				if (!lessonDto.getFeatureImage().isBlank())
					lesson.setFeatureImage(lessonDto.getFeatureImage());
				else
					lesson.setFeatureImage("uploads/images/post/Post_default.jpg");
				if (!lessonDto.getVideo().isBlank())
					lesson.setVideo(lessonDto.getVideo());
				else
					lesson.setVideo("uploads/video/post/video_post_default.mp4");
				PostEntity newPost = postService.createPost(lesson);
				int lessonId = newPost.getPostId();
				return new ResponseEntity<>(lessonId, HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Do not allow to add!", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
