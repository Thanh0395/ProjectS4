package com.example.demo.thanh.dto;

import java.sql.Timestamp;

public class FeedbackDto {
	private int feedbackId;
	
	private String content;
	
	private String userName;
	
	private String avatar;
	
	private String status;
	
	private Timestamp creatatedAt;
	
	private Timestamp updatedAt;

	public FeedbackDto() {
		super();
	}
	//list comment cho user
	public FeedbackDto(int feedbackId, String content, String userName, String avatar, Timestamp creatatedAt) {
		super();
		this.feedbackId = feedbackId;
		this.content = content;
		this.userName = userName;
		this.avatar = avatar;
		this.creatatedAt = creatatedAt;
	}
	//list comment cho admin
	public FeedbackDto(int feedbackId, String content, String userName, String avatar, String status, Timestamp creatatedAt) {
		super();
		this.feedbackId = feedbackId;
		this.content = content;
		this.userName = userName;
		this.avatar = avatar;
		this.status = status;
		this.creatatedAt = creatatedAt;
	}

	public int getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(int feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
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
	
}
