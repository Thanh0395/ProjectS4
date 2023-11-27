package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
@Builder
public class CategoryDto {
	
	private int categoryId;
	
	@NotNull(message = "Category Name must not be null!")
	private String categoryName;
	
	private String featureImage;
}
