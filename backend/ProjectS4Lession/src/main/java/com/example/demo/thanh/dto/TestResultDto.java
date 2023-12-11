package com.example.demo.thanh.dto;

import java.util.List;

public class TestResultDto {
	
	private List<QuestionDto> questions;
	
	private List<AchievementUserDto> achievements;
	
	private Boolean passed;
	
	private int totalAnswer;
	
	private int correctAnswer;
	
	private int score;
	
	private int gainGem;
	
	private int oldLevel;
	
	private int newLevel;
	
	private int oldExp;
	
	private int newExp;
	
	private String resultMessage = "";

	public TestResultDto() {
		super();
	}

	public List<QuestionDto> getQuestions() {
		return questions;
	}

	public void setQuestions(List<QuestionDto> questions) {
		this.questions = questions;
	}

	public List<AchievementUserDto> getAchievements() {
		return achievements;
	}

	public void setAchievements(List<AchievementUserDto> achievements) {
		this.achievements = achievements;
	}

	public Boolean getPassed() {
		return passed;
	}

	public void setPassed(Boolean passed) {
		this.passed = passed;
	}

	public int getTotalAnswer() {
		return totalAnswer;
	}

	public void setTotalAnswer(int totalAnswer) {
		this.totalAnswer = totalAnswer;
	}

	public int getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(int rightAnswer) {
		this.correctAnswer = rightAnswer;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getGainGem() {
		return gainGem;
	}

	public void setGainGem(int gainGem) {
		this.gainGem = gainGem;
	}

	public int getOldLevel() {
		return oldLevel;
	}

	public void setOldLevel(int oldLevel) {
		this.oldLevel = oldLevel;
	}

	public int getNewLevel() {
		return newLevel;
	}

	public void setNewLevel(int newLevel) {
		this.newLevel = newLevel;
	}

	public int getOldExp() {
		return oldExp;
	}

	public void setOldExp(int oldExp) {
		this.oldExp = oldExp;
	}

	public int getNewExp() {
		return newExp;
	}

	public void setNewExp(int newExp) {
		this.newExp = newExp;
	}

	public String getResultMessage() {
		return resultMessage;
	}

	public void setResultMessage(String resultMessage) {
		this.resultMessage = resultMessage;
	}
}
