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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EmptyFileException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.service.CategoryService;
import com.example.demo.service.PostService;
import com.example.demo.service.StorageService;
import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import jakarta.validation.Valid;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private PostService postService;

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
	public ResponseEntity<CategoryEntity> createCategory(@Valid CategoryDto categoryDto, MultipartFile file)
			throws IOException, EmptyFileException {
		boolean isNameExist = categoryService.checkNameExist(categoryDto.getCategoryName());
		if (isNameExist)
			return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
		if (!file.isEmpty()) {
			String filePath = storageService.uploadImageToFileSystem(file, "category", "images/category");
			if (filePath != null) {
				categoryDto.setFeatureImage(filePath);
			}
		} else {
			categoryDto.setFeatureImage("uploads/images/category/Category_default.jpg");
		}
		CategoryEntity category = categoryMapper.insertCategoryDtoToCategoryEntity(categoryDto);
		CategoryEntity categoryCreated = categoryService.createCategory(category);
		return new ResponseEntity<>(categoryCreated, HttpStatus.OK);
	}

	@GetMapping("/get-category-by-id/{categoryId}")
	public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable int categoryId) throws NotFoundException {
		CategoryEntity category = categoryService.getCategoryById(categoryId);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

	@DeleteMapping("/delete-category-by-id/{categoryId}")
	public ResponseEntity<String> deletePost(@PathVariable int categoryId) throws NotFoundException {
		try {
			List<PostEntity> list = postService.getPostByCateId(categoryId);
			if (list.isEmpty()) {
				categoryService.deleteCategoryById(categoryId);
				return new ResponseEntity<String>("Delete Category success with category Id :" + categoryId,
						HttpStatus.OK);
			} else
				return new ResponseEntity<String>("Category have in another content, Category ID: " + categoryId,
						HttpStatus.NOT_ACCEPTABLE);
		} catch (Exception e) {
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(value = "/update-category", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<CategoryEntity> updateCategory(@Valid CategoryDto categoryDto, MultipartFile newImage)
			throws NotFoundException, EmptyFileException, IOException {
		try {
			CategoryEntity categoryDb = categoryService.getCategoryById(categoryDto.getCategoryId());
			String dbName = categoryDb.getCategoryName();
			String newName = categoryDto.getCategoryName();
			boolean isNameExist = categoryService.checkNameExist(categoryDto.getCategoryName());
			boolean isOldName = dbName.equalsIgnoreCase(newName);
			if (isOldName) {
				if (!newImage.isEmpty()) {
					String filePath = storageService.uploadImageToFileSystem(newImage, "category", "images/category");
					if (filePath != null) {
						categoryDto.setFeatureImage(filePath);
						categoryDb.setFeatureImage(filePath);
					}
				}
			} else {
				if (isNameExist)
					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
				if (!newImage.isEmpty()) {
					String filePath = storageService.uploadImageToFileSystem(newImage, "category", "images/category");
					if (filePath != null) {
						categoryDto.setFeatureImage(filePath);
						categoryDb.setFeatureImage(filePath);
					}
				}
				categoryDb.setCategoryName(categoryDto.getCategoryName());
			}
			categoryService.createCategory(categoryDb);
			return new ResponseEntity<>(categoryDb, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
