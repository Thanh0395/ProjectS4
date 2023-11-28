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
@Table(name = "user_post_tbl")
public class UserPostEntity extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_post_id")
	private int userPostId;
	
	@Column(name = "is_pass", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean isPass;
	
	@Column(name = "is_refunded")
	private Boolean isRefunded;
	
	@Column(name = "score", columnDefinition = "INT DEFAULT 0")
	private int score;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	@JsonBackReference
	private UserEntity user;
	
	@ManyToOne
	@JoinColumn(name = "post_id", referencedColumnName = "post_id")
	@JsonBackReference
	private PostEntity post;
	
	

}
