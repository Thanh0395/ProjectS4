package com.example.demo.thanh.dto;

public class AchievementUserDto {
	private int achievementId;
	
	private String title;
	
	private Boolean isReceive;
	
	private int score;
	
	private double process;	
	
	private String badge;
	
	public AchievementUserDto() {
		super();
	}

	public AchievementUserDto(int achievementId, String title, Boolean isReceive, int score, double process,
			String badge) {
		super();
		this.achievementId = achievementId;
		this.title = title;
		this.isReceive = isReceive;
		this.score = score;
		this.process = process;
		this.badge = badge;
	}

	public int getAchievementId() {
		return achievementId;
	}

	public void setAchievementId(int achievementId) {
		this.achievementId = achievementId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getIsReceive() {
		return isReceive;
	}

	public void setIsReceive(Boolean isReceive) {
		this.isReceive = isReceive;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public double getProcess() {
		return process;
	}

	public void setProcess(double process) {
		this.process = process;
	}

	public String getBadge() {
		return badge;
	}

	public void setBadge(String badge) {
		this.badge = badge;
	}
	
}
