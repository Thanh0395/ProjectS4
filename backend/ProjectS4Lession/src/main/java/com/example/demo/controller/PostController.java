package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PostEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project4/posts")
public class PostController {

	@Autowired
	private PostService postService;
	
	@GetMapping("/list-post")
	public ResponseEntity<List<PostEntity>> getAllPost() throws BadRequestException {
		List<PostEntity> posts = postService.getAllPost();
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}
	
	@PostMapping("/create-post")
	public ResponseEntity<PostEntity> createPost(@Valid @RequestBody PostEntity post) {
		PostEntity postCreated = postService.createPost(post);
		return new ResponseEntity<PostEntity>(postCreated, HttpStatus.OK);
	}
	
	@GetMapping("/get-post-by-id/{postId}")
	public ResponseEntity<PostEntity> getPostById(@PathVariable int postId) throws NotFoundException{
		PostEntity post = postService.getPostById(postId);
		return new ResponseEntity<>(post, HttpStatus.OK);
	}
}
