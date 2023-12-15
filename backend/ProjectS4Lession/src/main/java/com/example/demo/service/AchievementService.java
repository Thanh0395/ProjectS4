package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AchievementEntity;
import com.example.demo.entity.UserAchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.nhan.dto.NhanAchievementDto;
import com.example.demo.repository.AchievementRepository;
import com.example.demo.repository.UserAchievementRepository;
import com.example.demo.thanh.dto.AchievementUserDto;

@Service
public class AchievementService {

	@Autowired
	private AchievementRepository achievementRepository;
	@Autowired
	private UserAchievementRepository userAchievementRepository;
	@Autowired
	private UserService userService;
	
	//Thanh
	public List<AchievementUserDto> findAchievementsByUserId(int UserId){
		return achievementRepository.findAchievementsByUserId(UserId);
	}

	public int findScore(int achieveID) {
		return achievementRepository.findByAchievementId(achieveID).getScore();
	}

	public AchievementEntity getAchievementById(int achieveId) {
		return achievementRepository.findByAchievementId(achieveId);
	}
	
	//Hung
	public List<AchievementEntity> getAchivementsByUser(int userId) 
			throws NotFoundException 
	{
		//From userId -> get list userAchivement -> get list achivement
		UserEntity userDb = userService.getUserById(userId);
		List<UserAchievementEntity> userAchievementDbs = userAchievementRepository.findByUser(userDb);
		if(userAchievementDbs == null || userAchievementDbs.isEmpty()) {
			throw new NotFoundException("Get List UserAchievement By User Fail. Maybe empty!");
		}
		List<AchievementEntity> achievements = userAchievementDbs.stream()
	            .map(UserAchievementEntity::getAchievement)
	            .collect(Collectors.toList());
	    return achievements;
	}
	
	// Nhan
	public List<NhanAchievementDto> getAllAchievements() {
		List<AchievementEntity> achievements = achievementRepository.findAll();
		return achievements.stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}

	private NhanAchievementDto convertEntityToDTO(AchievementEntity entity) {
		return new NhanAchievementDto(entity.getAchievementId(), entity.getTitle(), entity.getScore());
	}
}
