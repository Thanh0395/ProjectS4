package com.example.demo.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
@Builder
public class TagDto {
	
	private int tagId;
	
	@Column(name = "tag_name", nullable = false)
	@NotNull(message = "Tag Name must not be null!")
	@NotBlank(message = "Tag Name must not be left blank!")
	private String tagName;
	
}
