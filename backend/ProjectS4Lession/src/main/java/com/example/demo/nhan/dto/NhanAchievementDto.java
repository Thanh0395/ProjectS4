package com.example.demo.nhan.dto;

public class NhanAchievementDto {

	private int achievementId;
	private String title;
	private int score;

	public NhanAchievementDto() {
	    }

	public NhanAchievementDto(int achievementId, String title, int score) {
	        this.achievementId = achievementId;
	        this.title = title;
	        this.score = score;
	    }

	public NhanAchievementDto(int achievementId, String title) {
		super();
		this.achievementId = achievementId;
		this.title = title;
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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
}