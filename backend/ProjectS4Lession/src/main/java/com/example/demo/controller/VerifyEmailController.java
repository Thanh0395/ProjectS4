package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.VerifyEmailEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.UserService;
import com.example.demo.service.VerifyEmailService;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;
@RestController
@RequestMapping(DEV_DOMAIN_API + "/verify")
public class VerifyEmailController {

	@Autowired
	private UserService userService;
	@Autowired
	private VerifyEmailService verifyEmailService;
	@GetMapping("/verify-email/{userId}")
	public ResponseEntity<VerifyEmailEntity> createVerifyEmail(@PathVariable int userId) throws NotFoundException{
		UserEntity user = userService.getUserById(userId);
		VerifyEmailEntity verifyEmailCreated = verifyEmailService.createVerifyEmail(user);
		return new ResponseEntity<>(verifyEmailCreated, HttpStatus.OK);
		
	}
}
