package com.example.demo.dto;

public class TagDto {
	
	private int tagId;

	private String tagName;
	
	private int countPost;

	public TagDto() {
		super();
	}

	public TagDto(int tagId, String tagName) {
		super();
		this.tagId = tagId;
		this.tagName = tagName;
	}

	public TagDto(int tagId, String tagName, Long countPost) {
		super();
		this.tagId = tagId;
		this.tagName = tagName;
		this.countPost = countPost != null ? countPost.intValue() : 0;
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
	
}
