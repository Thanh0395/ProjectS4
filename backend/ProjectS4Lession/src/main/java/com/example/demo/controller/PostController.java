package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PostCreationDto;
import com.example.demo.dto.PostUpdationDto;
import com.example.demo.entity.PostEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mapper.Mapper;
import com.example.demo.mapper.PostMapper;
import com.example.demo.service.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project4/posts")
public class PostController {

	@Autowired
	private PostService postService;
	
	@Autowired
	private PostMapper postMapper;
	
	@GetMapping("/list-post")
	public ResponseEntity<List<PostEntity>> getAllPost() throws BadRequestException {
		List<PostEntity> posts = postService.getAllPost();
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}
	
	@PostMapping("/create-post")
	public ResponseEntity<PostEntity> createPost(@Valid @RequestBody PostCreationDto postCreationDto) {
		PostEntity post = postMapper.PostCreationDtoToPostEntity(postCreationDto);
		PostEntity postCreated = postService.createPost(post);
		return new ResponseEntity<PostEntity>(postCreated, HttpStatus.OK);
	}
	
	@GetMapping("/get-post-by-id/{postId}")
	public ResponseEntity<PostEntity> getPostById(@PathVariable int postId) throws NotFoundException{
		PostEntity post = postService.getPostById(postId);
		return new ResponseEntity<>(post, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-post-by-id/{postId}")
	public ResponseEntity<String> deletePost(@PathVariable int postId) throws NotFoundException{
		boolean postDeleted = postService.deletePostById(postId);
		return new ResponseEntity<String>("Delete Post success!", HttpStatus.OK);
	}
	
	@PutMapping("/update-post")
	public ResponseEntity<PostEntity> updatePost(@Valid @RequestBody PostUpdationDto postUpdationDto) throws NotFoundException {
		PostEntity post = postMapper.PostUpdationDtoToPostEntity(postUpdationDto);
		PostEntity postUpdated = postService.updatePost(post);
		return new ResponseEntity<PostEntity>(postUpdated, HttpStatus.OK);
	}

}
