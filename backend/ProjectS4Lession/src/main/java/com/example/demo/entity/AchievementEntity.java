package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "achievement_tbl")
public class AchievementEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "achievement_id")
	private int achievementId;
	
	@Column(name = "title")
	@NotNull(message = "Title must not be null!")
	@NotBlank(message = "Title must not be left blank!")
	private String title;
	
	@Column(name = "score")
	private int score;
	
	@ManyToOne
	@JoinColumn(name = "reward_id", referencedColumnName = "reward_id")
	private RewardEntity reward;
	
	//relation with UserAchievementEntity
    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<UserAchievementEntity> userAchievements = new ArrayList<>();
}
