package com.example.demo.dto.AuthDto;

import java.sql.Date;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminAddPermission {

	private List<String> listNameRole;
	
	@NotNull(message = "Email must not be null!")
	@NotBlank(message = "Email must not be left blank!")
	@Email(message = "Email invalid!")
	private String email;
}
