package com.example.demo.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserPostRepository;
import com.example.demo.dto.HungDto.PostDto;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Collections;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserPostRepository userPostRepository;

	@Autowired
	private ModelMapper mapper;

	public List<PostEntity> getAllPost() {
		List<PostEntity> posts = postRepository.findAll();
		return posts;
	}

	public PostEntity createPost(PostEntity post) {
		return postRepository.save(post);
	}

	public PostEntity getPostById(int id) throws NotFoundException {
		return postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post not found with id : " + id));
	}

	public PostEntity updatePost(PostEntity post) throws NotFoundException {
		PostEntity postDb = postRepository.findById(post.getPostId()).orElseThrow(
				() -> new NotFoundException("Update failed!. Post not found with id :" + post.getPostId()));
		if (postDb != null) {
			return postRepository.save(post);
		}
		return null;
	}

	public boolean deletePostById(int postId) throws NotFoundException {
		if (postRepository.existsById(postId)) {
			postRepository.deleteById(postId);
			return true;
		} else {
			throw new NotFoundException("Not found Post with post id :" + postId);
		}
	}

	public boolean checkAnyPostExist() {
		return postRepository.count() > 0;
	}

//	Thanh
	public List<PostEntity> getPostsByType(String type) {
		return postRepository.findByType(type);
	}

	public List<PostEntity> getPostsByTypeAndNotDeleted(String type) {
		return postRepository.findByTypeAndDeletedAtIsNullOrderByCreatedAtDesc(type);
	}

	public List<PostEntity> getPostsByTypeByUserIdAndNotDeleted(int userId, String type) {
		return postRepository.findPostsByUserIdAndTypeAndDeleteIsNull(userId, type);
	}

	public List<PostEntity> getTop5PostsByCategory(String type, CategoryEntity category) {
		return postRepository.findFirst5ByTypeAndCategoryOrderByCreatedAtDesc(type, category);
	}

	public List<PostEntity> getTop5PostsForEachCategory(String type, List<CategoryEntity> categories) {
		List<PostEntity> listPostEntity = new ArrayList<>();
		for (CategoryEntity category : categories) {
			List<PostEntity> top5Posts = postRepository.findFirst5ByTypeAndCategoryOrderByCreatedAtDesc(type, category);
			listPostEntity.addAll(top5Posts);
		}
		return listPostEntity;
	}

	public List<PostEntity> getPostByCateId(int cateId) {
		return postRepository.findByCategoryCategoryIdAndDeletedAtIsNull(cateId);
	}

	// Hung
	public List<PostDto> getTop5ByDeletedAtIsNullOrderByCreatedAtDesc() {
		List<PostEntity> recentTop5PostDb = postRepository.findTop5ByDeletedAtIsNullOrderByCreatedAtDesc();
		List<PostDto> recentTop5PostDto = recentTop5PostDb.stream().map(postEntity -> {
            PostDto postDto = mapper.map(postEntity, PostDto.class);
            String authorName = (postEntity.getUser() != null) ? postEntity.getUser().getName() : "Anonymous";
            String categoryName = (postEntity.getCategory() != null) ? postEntity.getCategory().getCategoryName()
					: "Uncategory";
            postDto.setAuthorName(authorName);
            postDto.setCategoryName(categoryName);
            postDto.setSetTopNew(true);
            return postDto;
        }).collect(Collectors.toList());
		return recentTop5PostDto;
	}

	public List<PostDto> getUserBoughtLesson(int userId) {
		List<PostEntity> postsDb = userPostRepository.findLesonsBoughtUserId(userId);
		List<PostDto> postsDto = null;
		if (postsDb != null && !postsDb.isEmpty()) {
			postsDto = postsDb.stream().map(postEntity -> {
				PostDto postDto = mapper.map(postEntity, PostDto.class);
				String authorName = (postEntity.getUser() != null) ? postEntity.getUser().getName() : "Anonymous";
				String categoryName = (postEntity.getCategory() != null) ? postEntity.getCategory().getCategoryName()
						: "Uncategory";
				postDto.setAvatar(postEntity.getUser().getAvatar());
				postDto.setAuthorName(authorName);
				postDto.setCategoryName(categoryName);
				return postDto;
			}).collect(Collectors.toList());
		} else {
			Collections.emptyList();
		}
		return postsDto;
	}

	public List<PostDto> getTop5PostsByFeedbackCount() {

		List<Object[]> top5PostsWithFeedbackCount = postRepository.findTop5PostsByFeedbackCount();

		List<PostDto> top5PostsFeedback = top5PostsWithFeedbackCount.stream().limit(5).map(object -> {
			PostEntity postEntity = (PostEntity) object[0];
			Long feedbackCount = (Long) object[1];
			String categoryName = (postEntity.getCategory() != null) ? postEntity.getCategory().getCategoryName()
					: "Uncategory";
			return PostDto.builder().postId(postEntity.getPostId()).featureImage(postEntity.getFeatureImage())
					.price(postEntity.getPrice()).prize(postEntity.getPrize()).title(postEntity.getTitle())
					.content(postEntity.getContent()).createdAt(postEntity.getCreatedAt()).categoryName(categoryName)
					.countFeedback(feedbackCount.intValue()).build();
		}).collect(Collectors.toList());
		return top5PostsFeedback;

	}

	public List<PostDto> getTop5ByDeletedAtIsNullOrderByPrizeDesc() {

		List<PostEntity> top5PostPrize = postRepository.findTop5ByDeletedAtIsNullOrderByPrizeDesc();

		List<PostDto> top5PostsPrize = top5PostPrize.stream().map(postEntity -> {
			String categoryName = (postEntity.getCategory() != null) ? postEntity.getCategory().getCategoryName()
					: "Uncategory";
			return PostDto.builder().postId(postEntity.getPostId()).featureImage(postEntity.getFeatureImage())
					.price(postEntity.getPrice()).prize(postEntity.getPrize()).title(postEntity.getTitle())
					.content(postEntity.getContent()).createdAt(postEntity.getCreatedAt()).categoryName(categoryName)
					.isSetTopPrize(true).build();
		}).collect(Collectors.toList());
		return top5PostsPrize;

	}
}
