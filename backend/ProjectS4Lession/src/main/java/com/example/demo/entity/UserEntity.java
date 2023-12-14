package com.example.demo.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
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
@Table(name = "user_tbl")
public class UserEntity extends BaseEntity implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;

	@Column(name = "email", nullable = false, length = 255)
	@NotNull(message = "Email must not be null!")
	@NotBlank(message = "Email must not be left blank!")
	@Email(message = "Email invalid!")
	private String email;

	@Column(name = "name", nullable = false, length = 255)
	@NotNull(message = "User Name shouldn't be null!")
	@NotBlank(message = "User Name shouldn't be left blank!")
	@Pattern(regexp = "^[a-zA-Z0-9\\s]*$", message = "User Name must not contain special characters.")
	private String name;

	@Column(name = "date_of_birth")
	private Date dateOfBirth;

	@Column(name = "avatar", length = 255, nullable = true)
	private String avatar;

	@Column(name = "password", length = 255, nullable = false)
	@NotNull(message = "Password must not be null!")
	@NotBlank(message = "Password must no be bleft blank!")
	// @Size(min = 6, max = 50, message = "Password must be between 6 and 50
	// characters.")
	private String password;

	@Column(name = "is_active", columnDefinition = "boolean default false")
	private boolean isActive;


	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<UserRoleEntity> userRoles = new ArrayList<>();

	// relation with VerifyEmailEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<VerifyEmailEntity> verifyEmails = new ArrayList<>();

	public void addVerifyEmail(VerifyEmailEntity verifyEmailEntity) {
		verifyEmails.add(verifyEmailEntity);
		verifyEmailEntity.setUser(this);
	}

	public void removeVerifyEmail(VerifyEmailEntity verifyEmailEntity) {
		verifyEmails.remove(verifyEmailEntity);
		verifyEmailEntity.setUser(null);
	}

	// relation with FavoriteCategoryEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<FavoriteCategoryEntity> favoriteCategories = new ArrayList<>();

	public void addFavoriteCategory(FavoriteCategoryEntity favoriteCategoryEntity) {
		favoriteCategories.add(favoriteCategoryEntity);
		favoriteCategoryEntity.setUser(this);
	}

	public void removeFavoriteCategory(FavoriteCategoryEntity favoriteCategoryEntity) {
		favoriteCategories.remove(favoriteCategoryEntity);
		favoriteCategoryEntity.setUser(null);
	}

	// relation with PostEntiy
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<PostEntity> posts = new ArrayList<>();

	public void addPost(PostEntity postEntity) {
		posts.add(postEntity);
		postEntity.setUser(this);
	}

	public void removePost(PostEntity postEntity) {
		posts.remove(postEntity);
		postEntity.setUser(null);
	}

	// relation with UserPostEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<UserPostEntity> userPosts = new ArrayList<>();

	// relation with FeedbackEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<FeedbackEntity> feedbacks = new ArrayList<>();

	public void addFeedback(FeedbackEntity feedbackEntity) {
		feedbacks.add(feedbackEntity);
		feedbackEntity.setUser(this);
	}

	public void removeFeedback(FeedbackEntity feedbackEntity) {
		feedbacks.remove(feedbackEntity);
		feedbackEntity.setUser(null);
	}

	// relation with QuestionEntiy
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<QuestionEntity> questions = new ArrayList<>();

	public void addQuestion(QuestionEntity questionEntity) {
		questions.add(questionEntity);
		questionEntity.setUser(this);
	}

	public void removeQuestion(QuestionEntity questionEntity) {
		questions.remove(questionEntity);
		questionEntity.setUser(null);
	}

	// relation with GemEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<GemEntity> gems = new ArrayList<>();

	public void addQuestion(GemEntity gemEntity) {
		gems.add(gemEntity);
		gemEntity.setUser(this);
	}

	public void removeQuestion(GemEntity gemEntity) {
		gems.remove(gemEntity);
		gemEntity.setUser(null);
	}

	// relation with UserLevelEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<UserLevelEntity> userLevels = new ArrayList<>();

	public void addQuestion(UserLevelEntity userLevelEntity) {
		userLevels.add(userLevelEntity);
		userLevelEntity.setUser(this);
	}

	public void removeQuestion(UserLevelEntity userLevelEntity) {
		userLevels.remove(userLevelEntity);
		userLevelEntity.setUser(null);
	}

	// relation with UserAchievementEntity
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<UserAchievementEntity> userAchievements = new ArrayList<>();

	public void addQuestion(UserAchievementEntity userAchievementEntity) {
		userAchievements.add(userAchievementEntity);
		userAchievementEntity.setUser(this);
	}

	public void removeQuestion(UserAchievementEntity userAchievementEntity) {
		userAchievements.remove(userAchievementEntity);
		userAchievementEntity.setUser(null);
	}

	// implement UserDetails
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (UserRoleEntity userRoleEntity : userRoles) {
			authorities.add(new SimpleGrantedAuthority(userRoleEntity.getRole().getName()));
		}
		return authorities;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public UserEntity(
			@NotNull(message = "Email must not be null!") @NotBlank(message = "Email must not be left blank!") @Email(message = "Email invalid!") String email,
			@NotNull(message = "User Name shouldn't be null!") @NotBlank(message = "User Name shouldn't be left blank!") @Pattern(regexp = "^[a-zA-Z0-9\\s]*$", message = "User Name must not contain special characters.") String name,
			Date dateOfBirth, String avatar,
			@NotNull(message = "Password must not be null!") @NotBlank(message = "Password must no be bleft blank!") String password,
			boolean isActive) {
		super();
		this.email = email;
		this.name = name;
		this.dateOfBirth = dateOfBirth;
		this.avatar = avatar;
		this.password = password;
		this.isActive = isActive;
	}
}
