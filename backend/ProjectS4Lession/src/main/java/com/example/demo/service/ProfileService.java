package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.HungDto.AchievementDto;
import com.example.demo.dto.HungDto.GemDto;
import com.example.demo.dto.HungDto.PostDto;
import com.example.demo.dto.HungDto.UserDto;
import com.example.demo.dto.HungDto.UserLevelDto;
import com.example.demo.dto.HungDto.ProfileDto.ProfileResponse;
import com.example.demo.entity.AchievementEntity;
import com.example.demo.entity.FeedbackEntity;
import com.example.demo.entity.GemEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserAchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserLevelEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.thanh.dto.FeedbackDto;

@Service
public class ProfileService {

	@Autowired
	private ModelMapper mapper;
	@Autowired
	private UserService userService;
	@Autowired
	private PostService postService;
	@Autowired
	private GemService gemService;
	@Autowired
	private UserLevelService userLevelService;
	@Autowired
	private AchievementService achievementService;
	@Autowired
	private UserAchievementService userAchievementService;
	@Autowired
	private FeedbackService feedbackService;


	public ProfileResponse profile(int userId) throws NotFoundException {

		UserEntity userDb = userService.getUserById(userId);
		GemEntity gemDb = gemService.getOrCreateGemByUserId(userId);
		UserLevelEntity userLevelDb = userLevelService.getOrCreateLevelByUserId(userId);
		List<AchievementEntity> achievementsDb = achievementService.getAchivementsByUser(userId);
		List<UserAchievementEntity> userAchievementsDb = userAchievementService.getUserAchievementsByUser(userDb);
		List<PostDto> recentTop5PostDto = postService.getTop5ByDeletedAtIsNullOrderByCreatedAtDesc();
		List<PostDto> top5PostsByFeedbackCountDto = postService.getTop5PostsByFeedbackCount();
		List<PostDto> top5PostsByPrizeDto = postService.getTop5ByDeletedAtIsNullOrderByPrizeDesc();
		List<PostDto> postsDto = postService.getUserBoughtLesson(userId);

		UserDto userDto = mapper.map(userDb, UserDto.class);
		GemDto gemDto = mapper.map(gemDb, GemDto.class);
		UserLevelDto userLevelDto = mapper.map(userLevelDb, UserLevelDto.class);
		List<AchievementDto> achievementsDto = new ArrayList<>();
		if (achievementsDb != null && !achievementsDb.isEmpty()) {
		    achievementsDto = achievementsDb.stream().map(achie -> {
		    	AchievementDto achieDto = mapper.map(achie, AchievementDto.class);
		    	String badge = "";
		    	if (achie.getReward() != null) {
		            badge = achie.getReward().getBadge();
		        }
		        achieDto.setBadge(badge);
		    	return achieDto;
		    }).collect(Collectors.toList());
		  //process va isReceivedBadge ko co trong achievement
			for (UserAchievementEntity userAchievement : userAchievementsDb) {
		        AchievementDto matchedAchievementDto = achievementsDto.stream()
		                .filter(achie -> achie.getAchievementId() == userAchievement.getAchievement().getAchievementId())
		                .findFirst()
		                .orElse(null);
		        if (matchedAchievementDto != null) {
		            matchedAchievementDto.setReceivedBadge(userAchievement.isReceivedBadge());
		            matchedAchievementDto.setProcess(userAchievement.getProcess());
		        }
		    }
		} else {
		    achievementsDto = Collections.emptyList();
		}
		ProfileResponse profileResponse = ProfileResponse
				.builder()
				.user(userDto)
				.gem(gemDto)
				.userLevel(userLevelDto)
				.posts(postsDto)
				.achievements(achievementsDto)
				.recentTop5Posts(recentTop5PostDto)
				.top5PostsByFeedbackCount(top5PostsByFeedbackCountDto)
				.top5PostsByPrize(top5PostsByPrizeDto)
				.build();
		return profileResponse;
	}
	
	public List<FeedbackDto> getFeedbacksByPostId(int postId){
		List<FeedbackDto> feedbackDtos = new ArrayList<>();
		List<FeedbackEntity> feedbacks = feedbackService.getFeedbacksByPostId(postId);
		if (feedbacks != null && !feedbacks.isEmpty()) {
			feedbackDtos = feedbacks.stream()
					.map(feedback -> new FeedbackDto(feedback.getFeedbackId(), feedback.getContent(),
							feedback.getUser() != null ? feedback.getUser().getName() : "Anonymous",
							feedback.getUser() != null ? feedback.getUser().getAvatar() : "uploads/images/user/User_default.jpg",
							feedback.getCreatedAt()))
					.collect(Collectors.toList());
		}
		return feedbackDtos;
	}
}
