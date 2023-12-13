package com.example.demo.nhan.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserResponseDto;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.nhan.dto.NhanUserDto;
import com.example.demo.nhan.dto.UserDetailDto;
import com.example.demo.nhan.dto.UserUpdateDto;
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
			UserDetailDto userDetailDto = new UserDetailDto();		
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
		
	    @PutMapping("/update")
	    public ResponseEntity<?> updateUser(@RequestBody UserUpdateDto userUpdateDto) 
	    		throws BadRequestException 
	    {
	    	UserEntity updatedUser = userService.updateUser(userUpdateDto.getUserId(), userUpdateDto.getIsActive(), userUpdateDto.getUserRoleUpdate());
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	    }
	    
	    private UserDetailDto convertToUserUpdateDto(UserEntity userEntity) {
			int userId = userEntity.getUserId();
			UserDetailDto userDetailDto = new UserDetailDto();		
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
