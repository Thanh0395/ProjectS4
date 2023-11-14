package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserCreationDto;
import com.example.demo.dto.UserUpdationDto;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mapper.Mapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import jakarta.validation.Valid;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserMapper userMapper;
	
	@GetMapping("/list-user")
	public ResponseEntity<List<UserEntity>> getAllUser(){
		List<UserEntity> listUser = userService.getAll();
		return new ResponseEntity<>(listUser, HttpStatus.OK);
	}
	
	@PostMapping("/create-user")
	public ResponseEntity<UserEntity> createUser(@Valid @RequestBody UserCreationDto userCreationDto) {
		try {
			UserEntity user = userMapper.UserCreationDtoToUserEntity(userCreationDto);
			UserEntity userCreated = userService.createUser(user);
			return new ResponseEntity<>(userCreated, HttpStatus.OK);
		} catch (Exception e) {
		}
		return null;
	}
	
	@GetMapping("/get-user-by-id/{id}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable int id) throws NotFoundException {
		UserEntity user = new UserEntity();
		user = userService.getUserById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-user-by-id/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable int id) throws NotFoundException {
		boolean userDeleted = userService.deleteUserById(id);
		return new ResponseEntity<>("Delete User success", HttpStatus.OK);
	}
	
	@PutMapping("/update-user")
	public ResponseEntity<UserEntity> updateUser(@Valid @RequestBody UserUpdationDto userUpdationDto) throws NotFoundException{
		UserEntity user = userMapper.UserUpdationToUserEntity(userUpdationDto);
		UserEntity userUpdated = userService.updateUser(user);
		return new ResponseEntity<>(userUpdated, HttpStatus.OK);
	}
	
	@GetMapping("/get-user-by-email/{email}")
	public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) throws NotFoundException {
		UserEntity user = new UserEntity();
		user = userService.getUserByEmail(email);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@GetMapping("/add-user-role/{userId}/{roleId}")
	public ResponseEntity<String> addRoleToUser(@PathVariable int userId,@PathVariable int roleId) throws NotFoundException{
		userService.addUserRole(userId, roleId);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	@GetMapping("/delete-user-role/{userRoleId}")
	public ResponseEntity<String> deleteRoleToUser(@PathVariable int userRoleId) throws NotFoundException{
		userService.deleteUserRole(userRoleId);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
}
