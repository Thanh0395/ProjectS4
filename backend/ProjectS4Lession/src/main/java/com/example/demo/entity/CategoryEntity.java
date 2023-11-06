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
@Table(name = "category_tbl")
public class CategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="category_id")
	private int categoryId;
	
	@Column(name = "category_name", nullable = false)
	@NotNull(message = "Category Name must not be null!")
	@NotBlank(message = "Category Name must not be left blank!")
	private String categoryName;
	
	@Column(name = "feature_image", nullable = true, length = 255)
	private String featureImage;
	
	//relation with FavoriteCategoryEntity
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private Set<FavoriteCategoryEntity> favoriteCategories = new HashSet<>();
	
	public void addFavoriteCategory(FavoriteCategoryEntity favoriteCategoryEntity) {
    	favoriteCategories.add(favoriteCategoryEntity);
    	favoriteCategoryEntity.setCategory(this);
    }
    public void removeFavoriteCategory(FavoriteCategoryEntity favoriteCategoryEntity) {
    	favoriteCategories.remove(favoriteCategoryEntity);
    	favoriteCategoryEntity.setCategory(null);
    }
    
    //relation with PostEntiy
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<PostEntity> posts = new ArrayList<>();
    
    public void addPost(PostEntity postEntity) {
    	posts.add(postEntity);
    	postEntity.setCategory(this);
    }
    
    public void removePost(PostEntity postEntity) {
    	posts.remove(postEntity);
    	postEntity.setCategory(null);
    }
    
    
}
