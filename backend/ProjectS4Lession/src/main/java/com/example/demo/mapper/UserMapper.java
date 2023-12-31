package com.example.demo.mapper;

import org.springframework.stereotype.Component;

import com.example.demo.dto.UserCreationDto;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.dto.UserUpdationDto;
import com.example.demo.dto.AuthDto.RegisterRequestDto;
import com.example.demo.entity.UserEntity;

@Component
public class UserMapper {

	//User Create Dto
	public UserCreationDto UserEntityToUserCreationDto(UserEntity userEntity) {
		UserCreationDto userCreationDto = UserCreationDto
				.builder()
				.email(userEntity.getEmail())
				.name(userEntity.getName())
				.password(userEntity.getPassword())
				.dateOfBirth(userEntity.getDateOfBirth())
				.avatar(userEntity.getAvatar())
				.build();
		return userCreationDto;
	}
	
	public UserEntity UserCreationDtoToUserEntity(UserCreationDto userCreationDto) {
		UserEntity userEntity = UserEntity
				.builder()
				.email(userCreationDto.getEmail())
				.name(userCreationDto.getName())
				.password(userCreationDto.getPassword())
				.dateOfBirth(userCreationDto.getDateOfBirth())
				.avatar(userCreationDto.getAvatar())
				.build();
		return userEntity;
	}
	
	//User update Dto
	
	public UserUpdationDto UserEntityToUserUpdation(UserEntity userEntity) {
		UserUpdationDto userUpdationDto = UserUpdationDto
				.builder()
				.userId(userEntity.getUserId())
				.email(userEntity.getEmail())
				.name(userEntity.getName())
				.dateOfBirth(userEntity.getDateOfBirth())
				.avatar(userEntity.getAvatar())
				.build();
		return userUpdationDto;
	}
	
	public UserEntity UserUpdationToUserEntity(UserUpdationDto userUpdationDto) {
		UserEntity userEntity = UserEntity
				.builder()
				.userId(userUpdationDto.getUserId())
				.email(userUpdationDto.getEmail())
				.name(userUpdationDto.getName())
				.dateOfBirth(userUpdationDto.getDateOfBirth())
				.avatar(userUpdationDto.getAvatar())
				.build();
		return userEntity;
	}
	
	//User ResponseDto
	
	public UserResponseDto UserEntityToUserResponse (UserEntity user) {
		UserResponseDto userResponseDto = UserResponseDto
				.builder()
				.userId(user.getUserId())
				.email(user.getEmail())
				.name(user.getName())
				.dateOfBirth(user.getDateOfBirth())
				.avatar(user.getAvatar())
				.isActive(user.isActive())
				//.userRoles(user.getUserRoles())
				.build();
		return userResponseDto;
	}
	
	//RegisterRequestDto
	public UserEntity RegisterRequestDtoToUserEntity(RegisterRequestDto registerRequestDto) {
		UserEntity userEntity = UserEntity
				.builder()
				.email(registerRequestDto.getEmail())
				.name(registerRequestDto.getName())
				.password(registerRequestDto.getPassword())
				.dateOfBirth(registerRequestDto.getDateOfBirth())
				.avatar(registerRequestDto.getAvatar())
				.build();
		return userEntity;
	}
}
