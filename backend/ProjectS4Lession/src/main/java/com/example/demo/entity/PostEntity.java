package com.example.demo.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "post_tbl")
public class PostEntity extends BaseEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
	private int postId;
	
	@Column(name = "feature_image", nullable = true, length = 255)
	private String featureImage;
	
	@Column(name = "video", nullable = true, length = 255)
	private String video;
	
	@Column(name = "price", columnDefinition = "INT DEFAULT 0")
	private int price;
	
	@Column(name = "prize", columnDefinition = "INT DEFAULT 0")
	private int prize;
	
	@Column(name = "title", nullable = false)
	@NotNull(message = "Title must not be null!")
	@NotBlank(message = "Title shouldn't be left blank!")
	private String title;
	
	@Column(name = "content")
	@NotNull(message = "Content must not be null!")
	@NotBlank(message = "Content shouldn't be left blank!")
	private String content;
	
	@Column(name = "type", length = 100, columnDefinition = "VARCHAR(100) CHECK (type IN ('lesson', 'test')) DEFAULT 'lesson'")
	@Pattern(regexp = "^(lesson|test)$", message = "Type must be 'lesson' or 'test'")
	private String type;
	
	@Column(name = "expired_at")
	private Timestamp expiredAt;
	
	public PostEntity(String featureImage, String video, int price, int prize,
			@NotNull(message = "Title must not be null!") @NotBlank(message = "Title shouldn't be left blank!") String title,
			@NotNull(message = "Content must not be null!") @NotBlank(message = "Content shouldn't be left blank!") String content,
			@Pattern(regexp = "^(lesson|test)$", message = "Type must be 'lesson' or 'test'") String type,
			Timestamp expiredAt) {
		super();
		this.featureImage = featureImage;
		this.video = video;
		this.price = price;
		this.prize = prize;
		this.title = title;
		this.content = content;
		this.type = type;
		this.expiredAt = expiredAt;
	}
	
	@ManyToOne
	@JoinColumn(name = "author", referencedColumnName = "user_id")
	@JsonIgnore
	private UserEntity user;
	
	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "category_id")
	@JsonIgnore
	private CategoryEntity category;
	
	@OneToMany(mappedBy = "post")
	//@JsonIgnore
	@JsonManagedReference
	private List<TagPostEntity> tagPosts = new ArrayList<>();
	
	//relation with UserPostEntity
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserPostEntity> userPosts = new ArrayList<>();
    
    //relation with FeedbackEntity
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<FeedbackEntity> feedbacks = new ArrayList<>();
    public void addFeedback(FeedbackEntity feedbackEntity) {
    	feedbacks.add(feedbackEntity);
    	feedbackEntity.setPost(this);
    }
    public void removeFeedback(FeedbackEntity feedbackEntity) {
    	feedbacks.remove(feedbackEntity);
    	feedbackEntity.setPost(null);
    }
    
    //relation with PostQuestionEntity
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PostQuestionEntity> postQuestions = new ArrayList<>();
    public void addFeedback(PostQuestionEntity postQuestionEntity) {
    	postQuestions.add(postQuestionEntity);
    	postQuestionEntity.setPost(this);
    }
    public void removeFeedback(PostQuestionEntity postQuestionEntity) {
    	postQuestions.remove(postQuestionEntity);
    	postQuestionEntity.setPost(null);
    }
	
}
