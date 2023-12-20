package com.example.demo.dto.AuthDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResetPasswordRequestDto {

	private String email;
	private String newPassword;
	private String confirmPassword;
	@Builder.Default
	private String code = "0";
}
