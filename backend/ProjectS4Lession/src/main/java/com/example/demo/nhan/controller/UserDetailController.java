package com.example.demo.nhan.controller;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.nhan.dto.UserDetailDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

@RestController

@RequestMapping(DEV_DOMAIN_API + "/nhan/users")
public class UserDetailController {

	private final UserService userService;

	@Autowired
	public UserDetailController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("detail/{userId}")
	public ResponseEntity<UserDetailDto> getUserDetails(@PathVariable("userId") int userId) throws NotFoundException {
		UserEntity userEntity = userService.getUserById(userId);

		if (userEntity != null) {
			UserDetailDto userDetailDto = convertToUserDetailDto(userEntity);
			return new ResponseEntity<>(userDetailDto, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	private UserDetailDto convertToUserDetailDto(UserEntity userEntity) {
		int userId = userEntity.getUserId();
		int amountOfPosts = userService.getAmountOfPostsByUserId(userId);
		//int amountOfGems = userService.getAmountOfGemsByUserId(userId);
		int amountOfUserAchievements = userService.getAmountOfUserAchievementsByUserId(userId);

		UserDetailDto userDetailDto = new UserDetailDto();
		
		userDetailDto.setAmountOfPosts(amountOfPosts);
		//userDetailDto.setAmountOfGems(amountOfGems);
		userDetailDto.setAmountOfUserAchievements(amountOfUserAchievements);
		
		
		userDetailDto.setAvatar(userEntity.getAvatar());
		userDetailDto.setUserName(userEntity.getName());
		userDetailDto.setEmail(userEntity.getEmail());
		List<String> userRoles = new ArrayList<>();
		for (UserRoleEntity userRoleEntity : userEntity.getUserRoles()) {
			userRoles.add(userRoleEntity.getRole().getName());
		}
		userDetailDto.setUserRoles(userRoles);

		userDetailDto.setDateOfBirth(userEntity.getDateOfBirth());

		return userDetailDto;
	}

	
	
	
}
