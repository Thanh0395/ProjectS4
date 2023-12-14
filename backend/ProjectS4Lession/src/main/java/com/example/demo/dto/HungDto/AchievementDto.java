package com.example.demo.dto.HungDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AchievementDto {

	private int achievementId;
	private String title;
	private int score;
	private boolean isReceivedBadge;
	private double process;
}
