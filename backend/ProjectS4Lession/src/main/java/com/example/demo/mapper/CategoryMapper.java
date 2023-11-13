package com.example.demo.mapper;

import org.springframework.stereotype.Component;

import com.example.demo.dto.CategoryCreationDto;
import com.example.demo.dto.CategoryUpdationDto;
import com.example.demo.entity.CategoryEntity;

@Component
public class CategoryMapper {

	public CategoryCreationDto CategoryEntityToCategoryCreationDto(CategoryEntity categoryEntity) {
		CategoryCreationDto categoryCreationDto = CategoryCreationDto
				.builder()
				.categoryName(categoryEntity.getCategoryName())
				.featureImage(categoryEntity.getFeatureImage())
				//.file()
				.build();
		return categoryCreationDto;
	}
	
	public CategoryEntity CategoryCreationToCategoryEntity(CategoryCreationDto categoryCreationDto) {
		CategoryEntity categoryEntity = CategoryEntity
				.builder()
				.categoryName(categoryCreationDto.getCategoryName())
				.featureImage(categoryCreationDto.getFeatureImage())
				.build();
		return categoryEntity;
	}
	
	public CategoryUpdationDto CategoryEntityToCategoryUpdationDto(CategoryEntity categoryEntity) {
		CategoryUpdationDto categoryUpdationDto = CategoryUpdationDto
				.builder()
				.categoryId(categoryEntity.getCategoryId())
				.categoryName(categoryEntity.getCategoryName())
				.featureImage(categoryEntity.getFeatureImage())
				.build();
		return categoryUpdationDto;
	}
	
	public CategoryEntity CategoryUpdationToCategoryEntity(CategoryUpdationDto categoryUpdationDto) {
		CategoryEntity categoryEntity = CategoryEntity
				.builder()
				.categoryId(categoryUpdationDto.getCategoryId())
				.categoryName(categoryUpdationDto.getCategoryName())
				.featureImage(categoryUpdationDto.getFeatureImage())
				.build();
		return categoryEntity;
	}
	
}
