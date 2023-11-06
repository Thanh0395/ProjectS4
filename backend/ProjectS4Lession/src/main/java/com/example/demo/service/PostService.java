package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.PostRepository;
import com.example.demo.entity.PostEntity;
import com.example.demo.exception.NotFoundException;

import java.util.List;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	public List<PostEntity> getAllPost(){
		List<PostEntity> posts = postRepository.findAll();
		return posts;
	}
	
	public PostEntity createPost(PostEntity post) {
		return postRepository.save(post);
	}
	
	public PostEntity getPostById(int id) throws NotFoundException {
	    return postRepository.findById(id)
	            .orElseThrow(() -> new NotFoundException("Post not found with id : " + id));
	}
	
	public PostEntity updatePost(PostEntity post)throws NotFoundException {
		PostEntity postDb = postRepository.findById(post.getPostId())
				.orElseThrow(() -> new NotFoundException("Update failed!. Post not found with id :" + post.getPostId()));
		if(postDb!= null) {
			return postRepository.save(postDb);
		}
		return null;
	}
	
	public boolean deletePostById(int postId) throws NotFoundException {
		if(postRepository.existsById(postId)) {
			postRepository.deleteById(postId);
			return true;
		}else {
			throw new NotFoundException("Not found Post with post id :" + postId);
		}	
	}
	
	public boolean checkAnyPostExist() {
		return postRepository.count() > 0;
	}
}
