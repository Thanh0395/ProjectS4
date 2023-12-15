package com.example.demo.thanh.dto;

public class AuthorDto {

	private int userId;

	private String avatar;

	private String author;

	private String authorEmail;

	private int countLesson;

	private int soldLesson;

	public AuthorDto() {
		super();
	}

	public AuthorDto(int userId, String author, String authorEmail, String avatar, Long countLesson, Long soldLesson) {
		super();
		this.userId = userId;
		this.avatar = avatar;
		this.author = author;
		this.authorEmail = authorEmail;
		this.countLesson = countLesson !=null ? countLesson.intValue() : 0;
		this.soldLesson = soldLesson != null ? soldLesson.intValue() : 0;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getAuthorEmail() {
		return authorEmail;
	}

	public void setAuthorEmail(String authorEmail) {
		this.authorEmail = authorEmail;
	}

	public int getCountLesson() {
		return countLesson;
	}

	public void setCountLesson(int countLesson) {
		this.countLesson = countLesson;
	}

	public int getSoldLesson() {
		return soldLesson;
	}

	public void setSoldLesson(int soldLesson) {
		this.soldLesson = soldLesson;
	}

}
