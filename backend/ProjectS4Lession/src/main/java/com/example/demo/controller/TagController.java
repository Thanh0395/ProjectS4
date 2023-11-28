package com.example.demo.controller;

import java.io.IOException;
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

import com.example.demo.dto.TagDto;
import com.example.demo.entity.TagEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.TagService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project4/tags")
public class TagController {

	@Autowired
	private TagService tagService;
		
	@GetMapping("/list-tag")
	public ResponseEntity<List<TagDto>> getAllTag() throws BadRequestException {
		List<TagDto> tagDtos = tagService.allTagCount();
		return new ResponseEntity<>(tagDtos, HttpStatus.OK);
	}
	
	@PostMapping("/create-tag")
    public ResponseEntity<TagEntity> createTag(@Valid @RequestBody TagDto tagDto) throws IOException {
		TagEntity tag = new TagEntity();
        tag.setTagName(tagDto.getTagName());
        return new ResponseEntity<>(tagService.createTag(tag), HttpStatus.OK);
    }
	
	@GetMapping("/get-tag-by-id/{tagId}")
	public ResponseEntity<TagEntity> getTagById(@PathVariable int tagId) throws NotFoundException{
		TagEntity tag = tagService.getTagById(tagId);
		return new ResponseEntity<>(tag, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-tag-by-id/{tagId}")
	public ResponseEntity<String> deletePost(@PathVariable int tagId) throws NotFoundException{
		tagService.deleteTagById(tagId);
		return new ResponseEntity<String>("Delete tag success with tag Id: " + tagId, HttpStatus.OK);
	}
	
	@PutMapping("/update-category")
	public ResponseEntity<TagEntity> updateCategory(@Valid @RequestBody TagDto tagDto) throws NotFoundException {
		TagEntity tag = new TagEntity();
		tag.setTagName(tagDto.getTagName());
		return new ResponseEntity<>(tagService.updateTag(tag), HttpStatus.OK);
	}
}
