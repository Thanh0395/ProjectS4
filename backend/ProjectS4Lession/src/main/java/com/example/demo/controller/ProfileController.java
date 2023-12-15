package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.HungDto.ProfileDto.ProfileResponse;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.ProfileService;
import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/profile")
@RequiredArgsConstructor
public class ProfileController {
	
	private final ProfileService profileService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<ProfileResponse> Profile(@PathVariable int userId) 
			throws NotFoundException 
	{
		ProfileResponse response = profileService.profile(userId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
