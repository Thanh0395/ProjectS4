package com.example.demo.dto.HungDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLevelDto {

	public int userLevelId;
	public int exp;
	public int level;
}
