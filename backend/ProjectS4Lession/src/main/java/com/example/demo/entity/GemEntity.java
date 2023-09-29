package com.example.demo.entity;

import java.util.Set;

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
@Table(name = "gem_tbl")
public class GemEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gem_id")
	private int gemId;
	
	@Column(name = "current")
	private int current;
	
	@Column(name = "earned")
	private int earned;
	
	@Column(name = "spent")
	private int spent;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private UserEntity user;
}
