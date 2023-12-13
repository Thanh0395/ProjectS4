package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.UserAchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserAchievementRepository;

@Service
public class UserAchievementService {

	@Autowired
	private UserAchievementRepository userAchievementRepository;

	@Autowired
	private AchievementService achievementService;

	// Thanh
	public List<UserAchievementEntity> getListAchieve(UserEntity user) {
		return userAchievementRepository.findByUser(user);
	}

	public List<UserAchievementEntity> addUserAchieve(List<UserAchievementEntity> list) {
		userAchievementRepository.saveAll(list);
		return list;
	}

	public void updateOrCreateUserAchievement(boolean isReceive, double process, int achievementId, UserEntity user) {
		List<UserAchievementEntity> userAchievementList = userAchievementRepository
				.findByUserAndAchievement_AchievementId(user, achievementId);

		if (userAchievementList.isEmpty()) {
			UserAchievementEntity userAchi = new UserAchievementEntity();
			userAchi.setReceivedBadge(isReceive);
			userAchi.setProcess(process);
			userAchi.setAchievement(achievementService.getAchievementById(achievementId));
			userAchi.setUser(user);
			userAchievementRepository.save(userAchi);
		} else {
			UserAchievementEntity userAchi = userAchievementList.get(0);
			userAchi.setReceivedBadge(isReceive);
			userAchi.setProcess(process);
			userAchi.setAchievement(achievementService.getAchievementById(achievementId));
			userAchi.setUser(user);
			userAchievementRepository.save(userAchi);
		}
	}

	// Hung
	public List<UserAchievementEntity> getUserAchievementsByUser(UserEntity user) {
		return userAchievementRepository.findByUser(user);
	}
}
