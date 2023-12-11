package com.example.demo.nhan.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.UserEntity;
import com.example.demo.nhan.dto.NhanUserDto;
import com.example.demo.service.UserService;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

@RestController

@RequestMapping(DEV_DOMAIN_API + "/nhan/users")
public class NhanUserController {
	 private final UserService userService; 

	    @Autowired
	    public NhanUserController(UserService userService) {
	        this.userService = userService;
	    }

	    @GetMapping("/list")
	    public ResponseEntity<List<NhanUserDto>> getAllUsers() {
	        List<UserEntity> users = userService.getAll(); 
	        List<NhanUserDto> userDtos = users.stream()
	                .map(this::convertToDto)
	                .collect(Collectors.toList());

	        return new ResponseEntity<>(userDtos, HttpStatus.OK);
	    }

	    // Helper method to convert UserEntity to UserDto
	    private NhanUserDto convertToDto(UserEntity userEntity) {
	        return new NhanUserDto(
	                userEntity.getUserId(),
	                userEntity.getEmail(),
	                userEntity.getName(),
	                userEntity.isActive(),
	                userEntity.getAvatar(),
	                userEntity.getUserRoles().stream()
	                        .map(userRoleEntity -> userRoleEntity.getRole().getName())
	                        .collect(Collectors.toList())
	        );
	    }

}
