package com.example.demo.mapper;

import org.hibernate.annotations.Comment;
import org.springframework.stereotype.Component;

import com.example.demo.dto.UserCreationDto;
import com.example.demo.entity.UserEntity;

@Component
public class Mapper {

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
}
