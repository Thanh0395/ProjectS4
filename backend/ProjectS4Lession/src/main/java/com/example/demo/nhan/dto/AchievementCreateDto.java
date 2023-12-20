package com.example.demo.nhan.dto;


public class AchievementCreateDto {

    private int achievementId; 
    private String title;
    private int score;
    private Integer rewardId;
    
    
    
    
	public AchievementCreateDto(int achievementId, String title, int score, Integer rewardId) {
		super();
		this.achievementId = achievementId;
		this.title = title;
		this.score = score;
		this.rewardId = rewardId;
	}
	
	
	public AchievementCreateDto() {
		super();

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
	public Integer getRewardId() {
		return rewardId;
	}
	public void setRewardId(Integer rewardId) {
		this.rewardId = rewardId;
	} 

    
}
