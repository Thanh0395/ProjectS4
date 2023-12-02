package com.example.demo.mapper;

import org.springframework.stereotype.Component;

import com.example.demo.dto.CategoryCreationDto;
import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.CategoryUpdationDto;
import com.example.demo.entity.CategoryEntity;

@Component
public class CategoryMapper {

//	public CategoryDto CategoryEntityToCategoryDto(CategoryEntity categoryEntity) {
//		CategoryDto categoryDto = CategoryDto
//				.builder()
//				.categoryName(categoryEntity.getCategoryName())
//				.featureImage(categoryEntity.getFeatureImage())
//				//.file()
//				.build();
//		return categoryDto;
//	}
	
	public CategoryEntity insertCategoryDtoToCategoryEntity(CategoryDto categoryDto) {
		CategoryEntity categoryEntity = CategoryEntity
				.builder()
				.categoryName(categoryDto.getCategoryName())
				.featureImage(categoryDto.getFeatureImage())
				.build();
		return categoryEntity;
	}
	
//	public CategoryUpdationDto CategoryEntityToCategoryUpdationDto(CategoryEntity categoryEntity) {
//		CategoryUpdationDto categoryUpdationDto = CategoryUpdationDto
//				.builder()
//				.categoryId(categoryEntity.getCategoryId())
//				.categoryName(categoryEntity.getCategoryName())
//				.featureImage(categoryEntity.getFeatureImage())
//				.build();
//		return categoryUpdationDto;
//	}
	
	public CategoryEntity updateCategoryDtoToCategoryEntity(CategoryDto categoryDto) {
		CategoryEntity categoryEntity = CategoryEntity
				.builder()
				.categoryId(categoryDto.getCategoryId())
				.categoryName(categoryDto.getCategoryName())
				.featureImage(categoryDto.getFeatureImage())
				.build();
		return categoryEntity;
	}
	
}
