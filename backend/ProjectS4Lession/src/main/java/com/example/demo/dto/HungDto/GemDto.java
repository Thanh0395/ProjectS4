package com.example.demo.dto.HungDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GemDto {
	private int gemId;
	private int current;
	private int earned;
	private int spent;
}
