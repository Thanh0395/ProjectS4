package com.example.demo.service;

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
	private PostRepository postRepository;
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
		List<PostEntity> postsDb = postRepository.findByUserUserId(userId);
		GemEntity gemDb = gemService.getOrCreateGemByUserId(userId);
		UserLevelEntity userLevelDb = userLevelService.getOrCreateLevelByUserId(userId);
		List<AchievementEntity> achievementsDb = achievementService.getAchivementsByUser(userId);
		List<UserAchievementEntity> userAchievementsDb = userAchievementService.getUserAchievementsByUser(userDb);

		UserDto userDto = mapper.map(userDb, UserDto.class);
		GemDto gemDto = mapper.map(gemDb, GemDto.class);
		UserLevelDto userLevelDto = mapper.map(userLevelDb, UserLevelDto.class);
		List<PostDto> postsDto = postsDb.stream().map(postEntity -> mapper.map(postEntity, PostDto.class))
				.collect(Collectors.toList());
		List<AchievementDto> achievementsDto = achievementsDb.stream()
				.map(achie -> mapper.map(achie, AchievementDto.class)).collect(Collectors.toList());
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
		ProfileResponse profileResponse = ProfileResponse
				.builder()
				.user(userDto)
				.gem(gemDto)
				.userLevel(userLevelDto)
				.posts(postsDto)
				.achievements(achievementsDto)
				.build();
		return profileResponse;
	}
}
