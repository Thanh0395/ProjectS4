package com.example.demo.dto.ProfileDto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
	private User user;
	private List<Post> posts;
	
	@Data
	public class User {
		public int userId;
		public String userName;
		public String avatar;
		public String email;
	}
	
	@Data
	public class Post {
		public int postId;
		public String featureImage;
		public String video;
		public int price;
		public int prize;
		public String title;
		public String content;
		public String type;
	}
}

