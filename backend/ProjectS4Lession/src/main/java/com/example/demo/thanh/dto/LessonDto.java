package com.example.demo.thanh.dto;

import java.sql.Timestamp;
import java.util.*;

import com.example.demo.dto.TagDto;

public class LessonDto {
	
	private int id;
	
	private String featureImage;
	
	private String video;
	
	private int price;
	
	private int prize;
	
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
	
	private List<TagDto> tags;
	
	private Boolean passed = false;
	
	private int score;
	
	private String errorMessage;
	
	public LessonDto() {
		super();
	}
//list lesson
	public LessonDto(int id, String image, String title, String content, int price,
			int userId,String userName,int cateId, String categoryName, Timestamp createDate, Timestamp updateDate) {
		super();
        this.id = id;
        this.featureImage = image;
        this.title = title;
        this.content = content;
        this.price = price;
        this.authorId = userId;
        this.authorName = userName;
        this.categoryId = cateId;
        this.categoryName = categoryName;
        this.creatatedAt = createDate;
        this.updatedAt = updateDate;
    }
	public LessonDto(int id, String image, String video, String title, String content, int price,
			String userName, String categoryName) {
		super();
        this.id = id;
        this.featureImage = image;
        this.video = video;
        this.title = title;
        this.content = content;
        this.price = price;
        this.authorName = userName;
        this.categoryName = categoryName;
    }
// Detail when user payed
	public LessonDto(int id, String featureImage, String video, int price,int prize, String title, String content,
			Timestamp creatatedAt, Timestamp updatedAt, Timestamp deletedAt, int authorId, String authorName,
			int categoryId, String categoryName, List<QuestionDto> questions, List<FeedbackDto> comments, List<TagDto> tags, 
			boolean isPass, int score) {
		super();
		this.id = id;
		this.featureImage = featureImage;
		this.video = video;
		this.price = price;
		this.prize = prize;
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
		this.tags = tags;
		this.passed = isPass;
		this.score = score;
	}
// Detail when user is NOT payed
	public LessonDto(int id, String featureImage, int price,int prize, String title, String content, Timestamp creatatedAt,
			Timestamp updatedAt, Timestamp deletedAt, int authorId, String authorName, int categoryId,
			String categoryName, List<FeedbackDto> comments, List<TagDto> tags) {
		super();
		this.id = id;
		this.featureImage = featureImage;
		this.price = price;
		this.prize = prize;
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
		this.tags = tags;
		this.errorMessage = "you must pay to watch the video";
	}
	// Detail in dashboard
		public LessonDto(int id, String featureImage, String video, int price,int prize, String title, String content,
				Timestamp creatatedAt, Timestamp updatedAt, Timestamp deletedAt, int authorId, String authorName,
				int categoryId, String categoryName, List<QuestionDto> questions, List<FeedbackDto> comments, List<TagDto> tags) {
			super();
			this.id = id;
			this.featureImage = featureImage;
			this.video = video;
			this.price = price;
			this.prize = prize;
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
			this.tags = tags;
		}
	public LessonDto(int id, String image, String video, String title, String content, int price) {
		super();
        this.id = id;
        this.featureImage = image;
        this.video = video;
        this.title = title;
        this.content = content;
        this.price = price;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getPrize() {
		return prize;
	}
	public void setPrize(int prize) {
		this.prize = prize;
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
	public List<TagDto> getTags() {
		return tags;
	}
	public void setTags(List<TagDto> tags) {
		this.tags = tags;
	}
	public boolean getPassed() {
		return passed;
	}
	public void setPassed(Boolean isPass) {
		this.passed = isPass;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}

}
