package com.example.demo.thanh.dto;

public class QuestionDto {

	private Long questionId;
	
	private String content;
	
	private String answerA;
	
	private String answerB;
	
	private String answerC;

	private String answerD;
	
	private String answer;
	
	private String rightAnswer;

	public QuestionDto() {
		super();
	}

	public QuestionDto(Long questionId, String content, String answerA, String answerB, String answerC,
			String answerD) {
		super();
		this.questionId = questionId;
		this.content = content;
		this.answerA = answerA;
		this.answerB = answerB;
		this.answerC = answerC;
		this.answerD = answerD;
	}
	public QuestionDto(Long questionId, String content, String answerA, String answerB, String answerC,
			String answerD,  String answer) {
		super();
		this.questionId = questionId;
		this.content = content;
		this.answerA = answerA;
		this.answerB = answerB;
		this.answerC = answerC;
		this.answerD = answerD;
		this.rightAnswer = answer;
	}

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAnswerA() {
		return answerA;
	}

	public void setAnswerA(String answerA) {
		this.answerA = answerA;
	}

	public String getAnswerB() {
		return answerB;
	}

	public void setAnswerB(String answerB) {
		this.answerB = answerB;
	}

	public String getAnswerC() {
		return answerC;
	}

	public void setAnswerC(String answerC) {
		this.answerC = answerC;
	}

	public String getAnswerD() {
		return answerD;
	}

	public void setAnswerD(String answerD) {
		this.answerD = answerD;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getRightAnswer() {
		return rightAnswer;
	}

	public void setRightAnswer(String rightAnswer) {
		this.rightAnswer = rightAnswer;
	}
	

}
