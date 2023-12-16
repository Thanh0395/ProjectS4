package com.example.demo.dto.HungDto.ProfileDto;

import java.sql.Date;
import java.util.List;

import com.example.demo.dto.HungDto.GemDto;
import com.example.demo.dto.HungDto.PostDto;
import com.example.demo.dto.HungDto.UserDto;
import com.example.demo.dto.HungDto.UserLevelDto;
import com.example.demo.dto.HungDto.AchievementDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
	private UserDto user;
	private List<PostDto> posts;
	private GemDto gem;
	private List<PostDto> recentTop5Posts;
	private UserLevelDto userLevel;
	private List<AchievementDto> achievements;
	private List<PostDto> top5PostsByFeedbackCount;
	private List<PostDto> top5PostsByPrize;

}

