package com.example.demo.dto;

public class CategoryDto {
	
	private int categoryId;
	
	private String categoryName;
	
	private String featureImage;
	
	private int countPost;
	
	private int countLesson;
	
	private int countExam;
	
	private boolean isFavorite;

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
	
	public CategoryDto(int categoryId, String categoryName,String featureImage, Long lessonCount, Long examCount, Long totalCount) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.featureImage = featureImage;
		this.countLesson = lessonCount != null ? lessonCount.intValue() : 0;
		this.countExam = examCount != null ? examCount.intValue() : 0;
		this.countPost = totalCount != null ? totalCount.intValue() : 0;
	}
	
	public CategoryDto(int categoryId, String categoryName, String featureImage, boolean favorite) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.featureImage = featureImage;
		this.isFavorite = favorite;
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

	public int getCountLesson() {
		return countLesson;
	}

	public void setCountLesson(int countLesson) {
		this.countLesson = countLesson;
	}

	public int getCountExam() {
		return countExam;
	}

	public void setCountExam(int countExam) {
		this.countExam = countExam;
	}

	public boolean isFavorite() {
		return isFavorite;
	}

	public void setFavorite(boolean isFavorite) {
		this.isFavorite = isFavorite;
	}
	
}
