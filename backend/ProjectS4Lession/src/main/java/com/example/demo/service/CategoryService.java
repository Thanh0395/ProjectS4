package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private StorageService storageService;
	
	public List<CategoryEntity> getAllCategory(){
		List<CategoryEntity> categories = categoryRepository.findAll();
		return categories;
	}
	
	public CategoryEntity createCategory(CategoryEntity category) {
		return categoryRepository.save(category);
	}
	
	public CategoryEntity getCategoryById(int id) throws NotFoundException {
	    return categoryRepository.findById(id)
	            .orElseThrow(() -> new NotFoundException("Category not found with id : " + id));
	}
	
	public CategoryEntity updateCategory(CategoryEntity category) throws NotFoundException {
		CategoryEntity categoryDb = categoryRepository.findById(category.getCategoryId())
				.orElseThrow(() -> new NotFoundException("Update failed!. Category not fond with id :" + category.getCategoryId()));
		if(categoryDb != null) {
			return categoryRepository.save(category);
		}
		return null;
	}
	
	public boolean deleteCategoryById(int categoryId) throws NotFoundException {
		if(categoryRepository.existsById(categoryId)) {
			categoryRepository.deleteById(categoryId);
			return true;
		}else {
			throw new NotFoundException("Not found Category with category id :" + categoryId);
		}	
	}
	
	//Thanh
	public boolean checkNameExist(String name) {
		if (categoryRepository.findByCategoryName(name).isEmpty()) return false;
		return true;
	}
	public List<CategoryDto> countTypePerCategory(){
		 return categoryRepository.countTypePerCategory();
	}
}
