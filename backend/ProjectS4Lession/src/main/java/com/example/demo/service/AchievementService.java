package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.AchievementRepository;


@Service
public class AchievementService {

	@Autowired
	private AchievementRepository achievementRepository;
}
