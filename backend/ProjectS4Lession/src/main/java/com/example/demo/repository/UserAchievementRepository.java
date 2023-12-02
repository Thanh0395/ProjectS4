package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserAchievementEntity;
import com.example.demo.entity.UserEntity;



@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievementEntity, Integer> {
	//Thanh
	List<UserAchievementEntity> findByUser(UserEntity user);
	
	List<UserAchievementEntity> findByUserAndAchievement_AchievementId(UserEntity user, int achievementId);
}
