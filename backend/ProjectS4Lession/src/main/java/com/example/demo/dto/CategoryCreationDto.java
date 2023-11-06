package com.example.demo.dto;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryCreationDto {

	@Column(name = "category_name", nullable = false)
	@NotNull(message = "Category Name must not be null!")
	@NotBlank(message = "Category Name must not be left blank!")
	private String categoryName;
	
	@Column(name = "feature_image", nullable = true, length = 255)
	private String featureImage;
}
