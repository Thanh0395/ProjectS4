package com.example.demo.dto;

public class TagDto {

	private int tagId;

	private String tagName;

	private int countPost;

	private int countLesson;
	
	private int countExam;

	public TagDto() {
		super();
	}

	public TagDto(int tagId, String tagName) {
		super();
		this.tagId = tagId;
		this.tagName = tagName;
	}

	public TagDto(int tagId, String tagName, Long countPost) {
		this.tagId = tagId;
		this.tagName = tagName;
		this.countPost = countPost != null ? countPost.intValue() : 0;
	}

	public TagDto(int tagId, String tagName, Long lessonCount, Long examCount, Long totalCount) {
		super();
		this.tagId = tagId;
		this.tagName = tagName;
		this.countLesson = lessonCount != null ? lessonCount.intValue() : 0;
		this.countExam = examCount != null ? examCount.intValue() : 0;
		this.countPost = totalCount != null ? totalCount.intValue() : 0;
	}

	public int getTagId() {
		return tagId;
	}

	public void setTagId(int tagId) {
		this.tagId = tagId;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public int getCountPost() {
		return countPost;
	}

	public void setCountPost(int countPost) {
		this.countPost = countPost;
	}

	public int getCountLesson() {
		return countLesson;
	}

	public void setCountLesson(int countLesson) {
		this.countLesson = countLesson;
	}

	public int getCountExam() {
		return countExam;
	}

	public void setCountExam(int countExam) {
		this.countExam = countExam;
	}

}
