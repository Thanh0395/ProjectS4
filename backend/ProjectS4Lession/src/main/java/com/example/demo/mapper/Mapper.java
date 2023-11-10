package com.example.demo.mapper;

import org.hibernate.annotations.Comment;
import org.springframework.stereotype.Component;

import com.example.demo.dto.PostCreationDto;
import com.example.demo.dto.PostUpdationDto;
import com.example.demo.dto.UserCreationDto;
import com.example.demo.entity.PostEntity;
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
	
	public PostCreationDto PostEntityToPostCreationDto(PostEntity postEntity) {
		PostCreationDto postCreationDto = PostCreationDto
				.builder()
				.featureImage(postEntity.getFeatureImage())
				.video(postEntity.getVideo())
				.price(postEntity.getPrice())
				.prize(postEntity.getPrize())
				.title(postEntity.getTitle())
				.content(postEntity.getContent())
				.type(postEntity.getType())
				.expiredAt(postEntity.getExpiredAt())
				.build();
		return postCreationDto;
	}
	
	public PostEntity PostCreationDtoToPostEntity(PostCreationDto postCreationDto) {
		PostEntity postEntity = PostEntity
				.builder()
				.featureImage(postCreationDto.getFeatureImage())
				.video(postCreationDto.getVideo())
				.price(postCreationDto.getPrice())
				.price(postCreationDto.getPrize())
				.title(postCreationDto.getTitle())
				.content(postCreationDto.getContent())
				.type(postCreationDto.getContent())
				.expiredAt(postCreationDto.getExpiredAt())
				.build();
		return postEntity;
	}
	
	public PostUpdationDto PostEntityToPostUpdationDto(PostEntity postEntity) {
		PostUpdationDto postUpdationDto = PostUpdationDto
				.builder()
				.postId(postEntity.getPostId())
				.featureImage(postEntity.getFeatureImage())
				.video(postEntity.getVideo())
				.price(postEntity.getPrice())
				.prize(postEntity.getPrize())
				.title(postEntity.getTitle())
				.content(postEntity.getContent())
				.type(postEntity.getType())
				.expiredAt(postEntity.getExpiredAt())
				.build();
		return postUpdationDto;
	} 
	
	public PostEntity PostUpdationDtoToPostEntity(PostUpdationDto postUpdationDto) {
		PostEntity postEntity = PostEntity
				.builder()
				.postId(postUpdationDto.getPostId())
				.featureImage(postUpdationDto.getFeatureImage())
				.video(postUpdationDto.getVideo())
				.price(postUpdationDto.getPrice())
				.price(postUpdationDto.getPrize())
				.title(postUpdationDto.getTitle())
				.content(postUpdationDto.getContent())
				.type(postUpdationDto.getContent())
				.expiredAt(postUpdationDto.getExpiredAt())
				.build();
		return postEntity;
	}
}
