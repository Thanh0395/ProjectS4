package com.example.demo.mapper;

import org.springframework.stereotype.Component;

import com.example.demo.dto.PostCreationDto;
import com.example.demo.dto.PostUpdationDto;
import com.example.demo.entity.PostEntity;

@Component
public class PostMapper {

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
