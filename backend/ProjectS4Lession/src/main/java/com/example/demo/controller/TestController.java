package com.example.demo.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.AchievementEntity;
import com.example.demo.entity.EmailEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.AchievementRepository;
import com.example.demo.service.AchievementService;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/test")
public class TestController {

	@Autowired
	private EmailService emailService;
	@Autowired
	private UserService userService;
	@Autowired
	private AchievementService achievementService;

	
	@GetMapping("")
	public ResponseEntity<String> test (){
		return new ResponseEntity<String>("teststsetsetestes", HttpStatus.OK);
	}
	
}
