package com.example.demo.dto;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostUpdationDto {

	private int postId;
	
	@Column(name = "feature_image", nullable = true, length = 255)
	private String featureImage;
	
	@Column(name = "video", nullable = true, length = 255)
	private String video;
	
	@Column(name = "price", columnDefinition = "INT DEFAULT 0")
	private int price;
	
	@Column(name = "prize", columnDefinition = "INT DEFAULT 0")
	private int prize;
	
	@Column(name = "title", nullable = false)
	@NotNull(message = "Title must not be null!")
	@NotBlank(message = "Title shouldn't be left blank!")
	private String title;
	
	@Column(name = "content")
	@NotNull(message = "Content must not be null!")
	@NotBlank(message = "Content shouldn't be left blank!")
	private String content;
	
	@Column(name = "type", length = 100, columnDefinition = "VARCHAR(100) CHECK (type IN ('lesson', 'test')) DEFAULT 'lesson'")
	@Pattern(regexp = "^(lesson|test)$", message = "Type must be 'lesson' or 'test'")
	private String type;
	
	@Column(name = "expired_at")
	private Timestamp expiredAt;
}
