package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_achievement_tbl")
public class UserAchievementEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_achievement_id")
	private int userAchievementId;
	
	@Column(name = "process", columnDefinition = "DOUBLE PRECISION DEFAULT 0.0")
	private double process;
	
	@Column(name = "is_received_badge", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean isReceivedBadge;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	@JsonBackReference
	private UserEntity user;
	
	@ManyToOne
	@JoinColumn(name = "achievement_id", referencedColumnName = "achievement_id")
	@JsonBackReference
	private AchievementEntity achievement;
}
