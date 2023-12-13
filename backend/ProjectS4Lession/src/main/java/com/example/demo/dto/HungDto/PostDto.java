package com.example.demo.dto.HungDto;

import java.util.ArrayList;
import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
	public int postId;
	public String featureImage;
	public String video;
	public int price;
	public int prize;
	public String title;
	public String content;
	public String type;
}
