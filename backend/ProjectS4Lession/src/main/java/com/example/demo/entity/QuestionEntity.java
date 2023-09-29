package com.example.demo.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import jakarta.persistence.ForeignKey;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "question_tbl")
public class QuestionEntity extends BaseEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "question_id")
	private Long questionId;
	
	@Column(name = "content", nullable = false)
	@NotNull(message = "Content must not be null!")
	@NotBlank(message = "Content shouldn't be left blank!")
	private String content;
	
	@Column(name = "answer_a", nullable = false)
	@NotNull(message = "Answer A must not be null!")
	@NotBlank(message = "Answer A shouldn't be left blank!")
	private String answerA;
	
	@Column(name = "answer_b", nullable = false)
	@NotNull(message = "Answer B must not be null!")
	@NotBlank(message = "Answer B shouldn't be left blank!")
	private String answerB;
	
	@Column(name = "answer_c", nullable = false)
	@NotNull(message = "Answer C must not be null!")
	@NotBlank(message = "Answer C shouldn't be left blank!")
	private String answerC;
	
	@Column(name = "answer_d", nullable = false)
	@NotNull(message = "Answer D must not be null!")
	@NotBlank(message = "Answer D shouldn't be left blank!")
	private String answerD;
	
    @Column(name = "right_answer", columnDefinition = "VARCHAR(1) CHECK (right_answer IN ('A','B','C','D')) NOT NULL")
    @NotNull(message = "Right Answer must not be null!")
	@NotBlank(message = "Right Answer shouldn't be left blank!")
	@Pattern(regexp = "[ABCD]", message = "Right Answer must be 'A', 'B', 'C', or 'D'")
	private String rightAnswer;
    
    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "user_id")
    private UserEntity user;
    
    //relation with PostQuestionEntity
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<PostQuestionEntity> postQuestions = new ArrayList<>();
    
	
}
