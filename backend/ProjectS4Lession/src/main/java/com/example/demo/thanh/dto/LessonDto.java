package com.example.demo.thanh.dto;

import java.sql.Timestamp;
import java.util.*;

public class LessonDto {
	
	private int postId;
	
	private String featureImage;
	
	private String video;
	
	private int price;
	
	private String title;
	
	private String content;
	
	private Timestamp creatatedAt;
	
	private Timestamp updatedAt;
	
	private Timestamp deletedAt;
	
	private Timestamp expiredAt;
	
	private int authorId;
	private String authorName;
	
	private int categoryId;
	
	private String categoryName = "";
	
	private List<QuestionDto> questions;
	
	private List<FeedbackDto> comments;
	
	private String errorMessage;
	
	public LessonDto() {
		super();
	}
//list lesson
	public LessonDto(int id, String image, String title, String content, int price,
			String userName, String categoryName, Timestamp createDate, Timestamp updateDate) {
		super();
        this.postId = id;
        this.featureImage = image;
        this.title = title;
        this.content = content;
        this.price = price;
        this.authorName = userName;
        this.categoryName = categoryName;
        this.creatatedAt = createDate;
        this.updatedAt = updateDate;
    }
	public LessonDto(int id, String image, String video, String title, String content, int price,
			String userName, String categoryName) {
		super();
        this.postId = id;
        this.featureImage = image;
        this.video = video;
        this.title = title;
        this.content = content;
        this.price = price;
        this.authorName = userName;
        this.categoryName = categoryName;
    }
// Detail when user payed
	public LessonDto(int postId, String featureImage, String video, int price, String title, String content,
			Timestamp creatatedAt, Timestamp updatedAt, Timestamp deletedAt, int authorId, String authorName,
			int categoryId, String categoryName, List<QuestionDto> questions, List<FeedbackDto> comments) {
		super();
		this.postId = postId;
		this.featureImage = featureImage;
		this.video = video;
		this.price = price;
		this.title = title;
		this.content = content;
		this.creatatedAt = creatatedAt;
		this.updatedAt = updatedAt;
		this.deletedAt = deletedAt;
		this.authorId = authorId;
		this.authorName = authorName;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.questions = questions;
		this.comments = comments;
	}
// Detail when user is NOT payed
	public LessonDto(int postId, String featureImage, int price, String title, String content, Timestamp creatatedAt,
			Timestamp updatedAt, Timestamp deletedAt, int authorId, String authorName, int categoryId,
			String categoryName, List<FeedbackDto> comments) {
		super();
		this.postId = postId;
		this.featureImage = featureImage;
		this.price = price;
		this.title = title;
		this.content = content;
		this.creatatedAt = creatatedAt;
		this.updatedAt = updatedAt;
		this.deletedAt = deletedAt;
		this.authorId = authorId;
		this.authorName = authorName;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.comments = comments;
		this.errorMessage = "you must pay to watch the video";
	}

	public LessonDto(int postId, String image, String video, String title, String content, int price) {
		super();
        this.postId = postId;
        this.featureImage = image;
        this.video = video;
        this.title = title;
        this.content = content;
        this.price = price;
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public String getFeatureImage() {
		return featureImage;
	}

	public void setFeatureImage(String featureImage) {
		this.featureImage = featureImage;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getCreatatedAt() {
		return creatatedAt;
	}

	public void setCreatatedAt(Timestamp creatatedAt) {
		this.creatatedAt = creatatedAt;
	}

	public Timestamp getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Timestamp updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Timestamp getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(Timestamp deletedAt) {
		this.deletedAt = deletedAt;
	}

	public Timestamp getExpiredAt() {
		return expiredAt;
	}

	public void setExpiredAt(Timestamp expiredAt) {
		this.expiredAt = expiredAt;
	}

	public int getAuthorId() {
		return authorId;
	}

	public void setAuthorId(int authorId) {
		this.authorId = authorId;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
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

	public List<QuestionDto> getQuestions() {
		return questions;
	}

	public void setQuestions(List<QuestionDto> questions) {
		this.questions = questions;
	}

	public List<FeedbackDto> getComments() {
		return comments;
	}

	public void setComments(List<FeedbackDto> comments) {
		this.comments = comments;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
	
}
