package com.example.demo.dto.HungDto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
	private int postId;
	private String featureImage;
	private String video;
	private int price;
	private int prize;
	private String title;
	private String content;
	private String type;
	private Timestamp createdAt;
	private int userId;
	private String authorName;
	private String categoryName;
	private int countFeedback;
	@Builder.Default
	private boolean isSetTopPrize = false;
	@Builder.Default
	private boolean isSetTopNew = false;
}
