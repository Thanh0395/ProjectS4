package com.example.demo.dto.AuthDto;

import java.sql.Date;
import java.sql.Timestamp;

import com.example.demo.entity.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerifyEmailResponseDto {

	private String action;
	private String code;
    private String email;
    private String message;
}
