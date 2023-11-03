package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CategoryEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<CategoryEntity> getAllCategory(){
		List<CategoryEntity> categories = categoryRepository.findAll();
		return categories;
	}
	
	public CategoryEntity createCategory(CategoryEntity category) {
		return categoryRepository.save(category);
	}
	
	public CategoryEntity updateCategory(CategoryEntity category) throws NotFoundException {
		CategoryEntity categoryDb = categoryRepository.findById(category.getCategoryId())
				.orElseThrow(() -> new NotFoundException("Update failed!. Category not fond with id :" + category.getCategoryId()));
		if(categoryDb != null) {
			return categoryRepository.save(categoryDb);
		}
		return null;
	}
}
