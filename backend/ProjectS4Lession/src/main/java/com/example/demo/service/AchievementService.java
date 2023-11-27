package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.AchievementRepository;
import com.example.demo.thanh.dto.AchievementUserDto;


@Service
public class AchievementService {

	@Autowired
	private AchievementRepository achievementRepository;
	
	//Thanh
	public List<AchievementUserDto> findAchievementsByUserId(int UserId){
		return achievementRepository.findAchievementsByUserId(UserId);
	}
}
