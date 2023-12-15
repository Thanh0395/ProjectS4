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
import com.example.demo.entity.GemEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserAchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserLevelEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.PostRepository;

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


	public ProfileResponse profile(int userId) throws NotFoundException {

		UserEntity userDb = userService.getUserById(userId);
		List<PostEntity> postsDb = postService.getUserBoughtLesson(userId);
		GemEntity gemDb = gemService.getOrCreateGemByUserId(userId);
		UserLevelEntity userLevelDb = userLevelService.getOrCreateLevelByUserId(userId);
		List<AchievementEntity> achievementsDb = achievementService.getAchivementsByUser(userId);
		List<UserAchievementEntity> userAchievementsDb = userAchievementService.getUserAchievementsByUser(userDb);
		List<PostEntity> recentTop5PostDb = postService.getTop5ByDeletedAtIsNullOrderByCreatedAtDesc();
		List<PostDto> top5PostsByFeedbackCountDto = postService.getTop5PostsByFeedbackCount();
		List<PostDto> top5PostsByPrizeDto = postService.getTop5ByDeletedAtIsNullOrderByPrizeDesc();


		UserDto userDto = mapper.map(userDb, UserDto.class);
		GemDto gemDto = mapper.map(gemDb, GemDto.class);
		UserLevelDto userLevelDto = mapper.map(userLevelDb, UserLevelDto.class);
		List<PostDto> postsDto = postsDb.stream().map(postEntity -> {
            PostDto postDto = mapper.map(postEntity, PostDto.class);
            String authorName = (postEntity.getUser() != null) ? postEntity.getUser().getName() : "Anonymous";
            String categoryName = (postEntity.getCategory() != null) ? postEntity.getCategory().getCategoryName()
					: "Uncategory";
            postDto.setAuthorName(authorName);
            postDto.setCategoryName(categoryName);
            return postDto;
        }).collect(Collectors.toList());
		
		List<AchievementDto> achievementsDto = new ArrayList<>();
		if (achievementsDb != null && !achievementsDb.isEmpty()) {
		    achievementsDto = achievementsDb.stream()
		            .map(achie -> mapper.map(achie, AchievementDto.class))
		            .collect(Collectors.toList());
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
		List<PostDto> recentTop5PostDto = recentTop5PostDb.stream().map(postEntity -> {
            PostDto postDto = mapper.map(postEntity, PostDto.class);
            String authorName = (postEntity.getUser() != null) ? postEntity.getUser().getName() : "Anonymous";
            String categoryName = (postEntity.getCategory() != null) ? postEntity.getCategory().getCategoryName()
					: "Uncategory";
            postDto.setAuthorName(authorName);
            postDto.setCategoryName(categoryName);
            return postDto;
        }).collect(Collectors.toList());
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
}
