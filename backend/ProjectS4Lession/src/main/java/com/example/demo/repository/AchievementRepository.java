package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.AchievementEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.thanh.dto.AchievementUserDto;


@Repository
public interface AchievementRepository extends JpaRepository<AchievementEntity, Integer> {
	//Thanh
	@Query("SELECT NEW com.example.demo.thanh.dto.AchievementUserDto(" +
	           "a.achievementId, a.title, ua.isReceivedBadge, a.score, ua.process, r.badge) " +
	           "FROM UserAchievementEntity ua " +
	           "JOIN ua.achievement a " +
	           "JOIN a.reward r " +
	           "WHERE ua.user.userId = :userId AND ua.isReceivedBadge = true " +
		       "ORDER BY a.achievementId ASC")
	    List<AchievementUserDto> findAchievementsByUserId(@Param("userId") int userId);
	
	AchievementEntity findByAchievementId(int achievementId);
	


}
