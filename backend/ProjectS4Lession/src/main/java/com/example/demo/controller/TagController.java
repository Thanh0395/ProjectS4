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
import com.example.demo.entity.TagPostEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.TagPostService;
import com.example.demo.service.TagService;
import com.example.demo.thanh.service.HttpRequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/project4/tags")
public class TagController {

	@Autowired
	private TagService tagService;

	@Autowired
	private TagPostService tagPostService;

	@GetMapping("/list-tag")
	public ResponseEntity<List<TagDto>> getAllTag() throws BadRequestException {
		List<TagDto> tagDtos = tagService.allTagCount();
		return new ResponseEntity<>(tagDtos, HttpStatus.OK);
	}

	@GetMapping("/analyze-list")
	public ResponseEntity<List<TagDto>> getAllTagCounted() {
		List<TagDto> cateDtos = tagService.countTypePerTag();
		return new ResponseEntity<>(cateDtos, HttpStatus.OK);
	}

	@PostMapping("/create-tag")
	public ResponseEntity<TagEntity> createTag(HttpServletRequest request, @RequestBody TagDto tagDto)
			throws IOException {
		if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
			boolean isNameExist = tagService.checkNameExist(tagDto.getTagName());
			if (isNameExist)
				return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
			TagEntity newTag = new TagEntity();
			newTag.setTagName(tagDto.getTagName());
			tagService.createTag(newTag);
			return new ResponseEntity<>(newTag, HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	@GetMapping("/get-tag-by-id/{tagId}")
	public ResponseEntity<TagEntity> getTagById(@PathVariable int tagId) throws NotFoundException {
		TagEntity tag = tagService.getTagById(tagId);
		return new ResponseEntity<>(tag, HttpStatus.OK);
	}

	@DeleteMapping("/delete-tag-by-id/{tagId}")
	public ResponseEntity<String> deletePost(@PathVariable int tagId, HttpServletRequest request)
			throws NotFoundException {
		if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
			List<TagPostEntity> list = tagPostService.findTagPostByTagid(tagId);
			if (list.isEmpty()) {
				tagService.deleteTagById(tagId);
				return new ResponseEntity<String>("Delete tag success with Id :" + tagId, HttpStatus.OK);
			} else
				return new ResponseEntity<String>("Tag had been in another content with ID: " + tagId,
						HttpStatus.NOT_ACCEPTABLE);
		} else
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	@PutMapping("/update-tag")
	public ResponseEntity<TagEntity> updateCategory(HttpServletRequest request, @RequestBody TagDto tagDto)
			throws NotFoundException {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN") || HttpRequestService.hasRole(request, "TEACHER")) {
				TagEntity tagDb = tagService.getTagById(tagDto.getTagId());
				String dbName = tagDb.getTagName();
				String newName = tagDto.getTagName().toLowerCase();
				boolean isOldName = dbName.equalsIgnoreCase(newName);
				boolean isNameExist = tagService.checkNameExist(newName);
				if (!isOldName && isNameExist)
					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
				else {
					tagDb.setTagName(newName);
					tagService.createTag(tagDb);
					return new ResponseEntity<>(tagDb, HttpStatus.OK);
				}
			} else
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
