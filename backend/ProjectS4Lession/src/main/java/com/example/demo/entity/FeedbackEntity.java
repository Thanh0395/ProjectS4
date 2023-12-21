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
@Table(name = "feedback_tbl")
public class FeedbackEntity extends BaseEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "feedback_id")
	private int feedbackId;
	
	@Column(name = "content", nullable = true)
	private String content;
	
	@Column(name = "status", nullable = true)
	private String status;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	@JsonBackReference
	private UserEntity user;
	
	@ManyToOne
	@JoinColumn(name = "post_id", referencedColumnName = "post_id")
	@JsonBackReference
	private PostEntity post;
}
