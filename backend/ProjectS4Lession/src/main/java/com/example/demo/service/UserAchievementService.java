package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.UserAchievementRepository;

@Service
public class UserAchievementService {

	@Autowired
	private UserAchievementRepository userAchievementRepository;
}
