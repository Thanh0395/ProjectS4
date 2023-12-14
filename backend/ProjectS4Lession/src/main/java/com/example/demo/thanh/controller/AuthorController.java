package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PostEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserPostService;
import com.example.demo.thanh.dto.AuthorDto;
import com.example.demo.thanh.dto.LessonDto;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/author")
public class AuthorController {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private UserPostService userPostService;
	
	@GetMapping("/all-author")
	public ResponseEntity<List<AuthorDto>> getListAuthorCountLesson() {
		try {
			List<AuthorDto> authorDtos = userRepo.countLessonAuthor();		
			return new ResponseEntity<>(authorDtos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	@GetMapping("/list-lesson/{authorId}")
	public ResponseEntity<?> getMyLessonById(@PathVariable int authorId) {
		try {
			List<PostEntity> lessonPosts = userPostService.findLesonAuthorId(authorId);
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
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
