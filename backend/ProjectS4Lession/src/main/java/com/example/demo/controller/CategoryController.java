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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.CategoryCreationDto;
import com.example.demo.dto.CategoryUpdationDto;
import com.example.demo.dto.PostCreationDto;
import com.example.demo.dto.PostUpdationDto;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.service.CategoryService;
import com.example.demo.service.StorageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project4/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private CategoryMapper categoryMapper;
		
	@GetMapping("/list-category")
	public ResponseEntity<List<CategoryEntity>> getAllCategory() throws BadRequestException {
		List<CategoryEntity> categories = categoryService.getAllCategory();
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}
	
	@PostMapping("/create-category")
	public ResponseEntity<CategoryEntity> createCategory(@Valid @RequestBody CategoryCreationDto categoryCreationDto){
		CategoryEntity category = categoryMapper.CategoryCreationToCategoryEntity(categoryCreationDto);
		CategoryEntity categoryCreated = categoryService.createCategory(category);
		return new ResponseEntity<>(categoryCreated, HttpStatus.OK);
	}
	
	@GetMapping("/get-category-by-id/{categoryId}")
	public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable int categoryId) throws NotFoundException{
		CategoryEntity category = categoryService.getCategoryById(categoryId);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-category-by-id/{categoryId}")
	public ResponseEntity<String> deletePost(@PathVariable int categoryId) throws NotFoundException{
		boolean categoryDeleted = categoryService.deleteCategoryById(categoryId);
		return new ResponseEntity<String>("Delete Category success with category Id :" + categoryId, HttpStatus.OK);
	}
	
	@PutMapping("/update-category")
	public ResponseEntity<CategoryEntity> updateCategory(@Valid @RequestBody CategoryUpdationDto categoryUpdationDto) throws NotFoundException {
		CategoryEntity category = categoryMapper.CategoryUpdationToCategoryEntity(categoryUpdationDto);
		CategoryEntity categoryUpdated = categoryService.updateCategory(category);
		return new ResponseEntity<>(categoryUpdated, HttpStatus.OK);
	}
}
