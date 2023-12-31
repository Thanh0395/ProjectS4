package com.example.demo.dto.AuthDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {
	
	@NotNull(message = "Email must not be null!")
	@NotBlank(message = "Email must not be left blank!")
	@Email(message = "Email invalid!")
	private String email;
	
	private String oldPassword;
	
	@NotNull(message = "Password must not be null!")
	@NotBlank(message = "Password must no be bleft blank!")
	private String newPassword;
	
	private String confirmPassword;
}
