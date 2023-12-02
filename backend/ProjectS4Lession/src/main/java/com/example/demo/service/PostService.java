package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.PostRepository;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.exception.NotFoundException;

import java.util.List;
import java.util.ArrayList;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

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
}
