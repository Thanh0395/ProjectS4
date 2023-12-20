package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.AchievementEntity;
import com.example.demo.entity.RewardEntity;
import com.example.demo.entity.UserAchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.nhan.dto.AchievementCreateDto;
import com.example.demo.nhan.dto.NhanAchievementDto;
import com.example.demo.repository.AchievementRepository;
import com.example.demo.repository.RewardRepository;
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
	
	@Autowired
	private RewardRepository rewardRepository;

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

	// Hung
	public List<AchievementEntity> getAchivementsByUser(int userId) throws NotFoundException {
		// From userId -> get list userAchivement -> get list achivement
		UserEntity userDb = userService.getUserById(userId);
		List<UserAchievementEntity> userAchievementDbs = userAchievementRepository.findByUser(userDb);
		List<AchievementEntity> achievements = null;
		if(userAchievementDbs != null && !userAchievementDbs.isEmpty()) {
			achievements = userAchievementDbs.stream()
		            .map(UserAchievementEntity::getAchievement)
		            .collect(Collectors.toList());
		}
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

	public AchievementEntity saveAchievement(NhanAchievementDto achievementDto) {
		AchievementEntity achievementEntity = achievementRepository.findByAchievementId(achievementDto.getAchievementId());
		achievementEntity.setTitle(achievementDto.getTitle());
		achievementEntity.setScore(achievementDto.getScore());
		return achievementRepository.save(achievementEntity);
	}
	
	
	public void deleteAchievement(int achievementId) throws NotFoundException {
	    List<UserAchievementEntity> userAchievements = userAchievementRepository.findByAchievement_AchievementId(achievementId);
	    if (userAchievements != null && !userAchievements.isEmpty()) {
	        throw new RuntimeException("Cannot delete achievement as it is linked to users.");
	    }

	    AchievementEntity achievementEntity = achievementRepository.findByAchievementId(achievementId);
	    if (achievementEntity == null) {
	        throw new NotFoundException("Achievement not found with id: " + achievementId);
	    }

	    achievementRepository.delete(achievementEntity);
	}
	

	
	public AchievementEntity createAchievement(AchievementCreateDto achievementCreateDto) {
        AchievementEntity achievement = new AchievementEntity();
        achievement.setTitle(achievementCreateDto.getTitle());
        achievement.setScore(achievementCreateDto.getScore());

        if (achievementCreateDto.getRewardId() != null) {
            RewardEntity reward = rewardRepository.findById(achievementCreateDto.getRewardId())
                .orElseThrow(() -> new RuntimeException("Reward not found"));
            achievement.setReward(reward);
        }

        return achievementRepository.save(achievement);
    }
	
	
}
