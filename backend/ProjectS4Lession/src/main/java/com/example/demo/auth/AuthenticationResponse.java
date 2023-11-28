package com.example.demo.auth;

import com.example.demo.dto.UserResponseDto;
import com.example.demo.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	private String token;
	private String refreshToken;
	private UserResponseDto user;
	//private UserEntity user;
}
