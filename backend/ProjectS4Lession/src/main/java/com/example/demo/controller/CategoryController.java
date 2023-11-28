package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EmptyFileException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.service.CategoryService;
import com.example.demo.service.StorageService;
import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;


import jakarta.validation.Valid;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private CategoryMapper categoryMapper;
	
	@Autowired
	private StorageService storageService;
		
	@GetMapping("/list-category")
	public ResponseEntity<List<CategoryEntity>> getAllCategory() throws BadRequestException {
		List<CategoryEntity> categories = categoryService.getAllCategory();
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}
	
	@PostMapping(value = "/create-category", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryEntity> createCategory(
            @Valid CategoryDto categoryDto,
            MultipartFile file) throws IOException , EmptyFileException{

        if(file != null) {
        	String filePath = storageService.uploadImageToFileSystem(file, "Category", "images/category");
        	if(filePath != null) {
        		categoryDto.setFeatureImage(filePath);
        	}
        }else {
        	categoryDto.setFeatureImage("image-default-category");
        }
        CategoryEntity category = categoryMapper.insertCategoryDtoToCategoryEntity(categoryDto);
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
		categoryService.deleteCategoryById(categoryId);
		return new ResponseEntity<String>("Delete Category success with category Id :" + categoryId, HttpStatus.OK);
	}
	
	@PutMapping("/update-category")
	public ResponseEntity<CategoryEntity> updateCategory(@Valid @RequestBody CategoryDto categoryDto) throws NotFoundException {
		CategoryEntity category = categoryMapper.updateCategoryDtoToCategoryEntity(categoryDto);
		CategoryEntity categoryUpdated = categoryService.updateCategory(category);
		return new ResponseEntity<>(categoryUpdated, HttpStatus.OK);
	}
}
