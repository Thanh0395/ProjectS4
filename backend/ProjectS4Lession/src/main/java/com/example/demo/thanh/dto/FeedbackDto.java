package com.example.demo.thanh.dto;

import java.sql.Timestamp;

public class FeedbackDto {
	private int feedbackId;
	
	private String content;
	
	private String userName;
	
	private Timestamp creatatedAt;
	
	private Timestamp updatedAt;

	public FeedbackDto() {
		super();
	}

	public FeedbackDto(int feedbackId, String content, String userName, Timestamp creatatedAt) {
		super();
		this.feedbackId = feedbackId;
		this.content = content;
		this.userName = userName;
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
