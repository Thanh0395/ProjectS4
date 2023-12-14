package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.nhan.dto.NhanAchievementDto;
import com.example.demo.repository.AchievementRepository;
import com.example.demo.thanh.dto.AchievementUserDto;

@Service
public class AchievementService {

	@Autowired
	private AchievementRepository achievementRepository;

	// Thanh
	public List<AchievementUserDto> findAchievementsByUserId(int UserId) {
		return achievementRepository.findAchievementsByUserId(UserId);
	}

	public int findScore(int achieveID) {
		return achievementRepository.findByAchievementId(achieveID).getScore();
	}

	public AchievementEntity getAchievementById(int achieveId) {
		return achievementRepository.findByAchievementId(achieveId);
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
