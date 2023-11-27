package com.example.demo.dto;

import java.sql.Date;
import java.util.List;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserRoleEntity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
	private int userId;
	private String email;
	private String name;
	private String password;
	private Date dateOfBirth;
	private String avatar;
	private boolean isActive;
	//private List<UserRoleEntity> userRoles;
	private List<RoleEntity> roles;
}
