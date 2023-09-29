package com.example.demo.entity;

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
@Table(name = "post_question_tbl")
public class PostQuestionEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int postQuestionId;
	
	@ManyToOne
	@JoinColumn(name = "question_id", referencedColumnName = "question_id")
	private QuestionEntity question;
	
	@ManyToOne
	@JoinColumn(name = "post_id", referencedColumnName = "post_id")
	private PostEntity post;
	

}
