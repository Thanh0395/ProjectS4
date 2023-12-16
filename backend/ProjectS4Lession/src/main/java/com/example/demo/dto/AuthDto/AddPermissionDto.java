package com.example.demo.dto.AuthDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddPermissionDto {

	private String email;
	
	@Builder.Default
	private String roleName = null;
}
