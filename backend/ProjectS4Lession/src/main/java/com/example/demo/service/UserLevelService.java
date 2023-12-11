package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserLevelEntity;
import com.example.demo.repository.UserLevelRepository;

@Service
public class UserLevelService {

	@Autowired
	private UserLevelRepository userLevelRepository;
	//Thanh
		@Transactional
	    public UserLevelEntity getOrCreateLevelByUserId(int userId) {
	        
			List<UserLevelEntity> levelEntities = userLevelRepository.findByUserUserId(userId);
			UserLevelEntity userLevel;
			if (levelEntities.isEmpty()) {
				userLevel = new UserLevelEntity();
				userLevel.setExp(0);
				userLevel.setLevel(0);

	            // Set the user for the new gem
	            UserEntity user = new UserEntity();
	            user.setUserId(userId);
	            userLevel.setUser(user);

	            // Save the new gem
	            userLevel = userLevelRepository.save(userLevel);
			} else {
				userLevel = levelEntities.get(0);
			}
	        return userLevel;
	    }
		
		public UserLevelEntity saveLevelUser(UserLevelEntity levelEntity) {
			return userLevelRepository.save(levelEntity);
		}
}
