package com.example.demo.mapper;

import org.springframework.stereotype.Component;

import com.example.demo.dto.UserCreationDto;
import com.example.demo.dto.UserUpdationDto;
import com.example.demo.entity.UserEntity;

@Component
public class UserMapper {

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
	
	public UserUpdationDto UserEntityToUserUpdation(UserEntity userEntity) {
		UserUpdationDto userUpdationDto = UserUpdationDto
				.builder()
				.userId(userEntity.getUserId())
				.email(userEntity.getEmail())
				.name(userEntity.getName())
				.password(userEntity.getPassword())
				.dateOfBirth(userEntity.getDateOfBirth())
				.avatar(userEntity.getAvatar())
				.build();
		return userUpdationDto;
	}
	
	public UserEntity UserUpdationToUserEntity(UserUpdationDto userUpdationDto) {
		UserEntity userEntity = UserEntity
				.builder()
				.email(userUpdationDto.getEmail())
				.name(userUpdationDto.getName())
				.password(userUpdationDto.getPassword())
				.dateOfBirth(userUpdationDto.getDateOfBirth())
				.avatar(userUpdationDto.getAvatar())
				.build();
		return userEntity;
	}
}