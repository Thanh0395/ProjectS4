package com.example.demo.dto;

public class CategoryDto {
	
	private int categoryId;
	
	private String categoryName;
	
	private String featureImage;
	
	private int countPost;

	public CategoryDto() {
		super();
	}

	public CategoryDto(int categoryId, String categoryName, String featureImage) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.featureImage = featureImage;
	}

	public CategoryDto(int categoryId, String categoryName, String featureImage, int countPost) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.featureImage = featureImage;
		this.countPost = countPost;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getFeatureImage() {
		return featureImage;
	}

	public void setFeatureImage(String featureImage) {
		this.featureImage = featureImage;
	}

	public int getCountPost() {
		return countPost;
	}

	public void setCountPost(int countPost) {
		this.countPost = countPost;
	}
	
}
