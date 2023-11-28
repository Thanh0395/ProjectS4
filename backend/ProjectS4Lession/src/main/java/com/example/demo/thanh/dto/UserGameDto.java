package com.example.demo.thanh.dto;

import java.util.List;

import com.example.demo.entity.RewardEntity;

public class UserGameDto {
	private int userId;
	
	private int gem;
	
	private int earned;
	
	private int spent;
	
	private int level;
	
	private int exp;
	
	private List<AchievementUserDto> achievements;
	
	private String errorMessage;

	public UserGameDto() {
		super();
	}

	public UserGameDto(int userId, int gem, int earned, int spent, int level, int exp,
			 List<AchievementUserDto> achievements, List<RewardEntity> rewards) {
		super();
		this.userId = userId;
		this.gem = gem;
		this.earned = earned;
		this.spent = spent;
		this.level = level;
		this.exp = exp;
		this.achievements = achievements;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getGem() {
		return gem;
	}

	public void setGem(int gem) {
		this.gem = gem;
	}

	public int getEarned() {
		return earned;
	}

	public void setEarned(int earned) {
		this.earned = earned;
	}

	public int getSpent() {
		return spent;
	}

	public void setSpent(int spent) {
		this.spent = spent;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public List<AchievementUserDto> getAchievements() {
		return achievements;
	}

	public void setAchievements(List<AchievementUserDto> achievements) {
		this.achievements = achievements;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
