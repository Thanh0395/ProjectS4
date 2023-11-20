package com.example.demo.dto.Dashboard.LessionDto;

import com.example.demo.entity.CategoryEntity;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ListLessionDto {

	private int postId;
	private String featureImage;
	
	//private String video;
	private int price;
	
	//private int prize;

	private String title;
	private String content;
	private String type;
	private CategoryEntity category;
}
