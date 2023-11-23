package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.GemEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserLevelEntity;
import com.example.demo.service.AchievementService;
import com.example.demo.service.GemService;
import com.example.demo.service.RewardService;
import com.example.demo.service.UserLevelService;
import com.example.demo.service.UserService;
import com.example.demo.thanh.dto.AchievementUserDto;
import com.example.demo.thanh.dto.LessonDto;
import com.example.demo.thanh.dto.UserGameDto;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/game")
public class GameController {
	@Autowired
	private UserService userService;

	@Autowired
	private GemService gemService;
	
	@Autowired
	private UserLevelService levelService;
	
	@Autowired
	private AchievementService achieveService;

	@Autowired
	private RewardService rewardService;
	@GetMapping("/user-data/{userId}")
	public ResponseEntity<UserGameDto> getUserGameData(@PathVariable int userId) {
		try {
			UserGameDto userData = new UserGameDto();
			
			GemEntity gemdata = gemService.getOrCreateGemByUserId(userId);
			UserLevelEntity levelData = levelService.getOrCreateLevelByUserId(userId);
			List<AchievementUserDto> achievements = achieveService.findAchievementsByUserId(userId);
			//Get value for data
			userData.setUserId(userId);
			userData.setGem(gemdata.getCurrent());
			userData.setEarned(gemdata.getEarned());
			userData.setSpent(gemdata.getSpent());
			userData.setLevel(levelData.getLevel());
			userData.setExp(levelData.getExp());
			userData.setAchievements(achievements);
			if (userData.getExp()==0) userData.setErrorMessage("Study to get more badge...");
			return new ResponseEntity<>(userData, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/achievements/{userId}")
	public ResponseEntity<List<AchievementUserDto>> getAchievements(@PathVariable int userId) {
		try {
			List<AchievementUserDto> achievements = achieveService.findAchievementsByUserId(userId);
			return new ResponseEntity<>(achievements, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
