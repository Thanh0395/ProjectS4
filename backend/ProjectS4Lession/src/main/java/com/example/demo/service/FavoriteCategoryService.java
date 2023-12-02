package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.FavoriteCategoryEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.FavoriteCategoryRepository;

@Service
public class FavoriteCategoryService {

	@Autowired
	private FavoriteCategoryRepository favoriteCategoryRepository;
	
	//Thanh
	public FavoriteCategoryEntity createFavoriteCategory(FavoriteCategoryEntity favoCate) {
		return favoriteCategoryRepository.save(favoCate);
	}
	public void deleteFavoriteCategory(FavoriteCategoryEntity favoCate) {
		favoriteCategoryRepository.delete(favoCate);
	}
	public List<FavoriteCategoryEntity> findByUserAndCategory(UserEntity user, CategoryEntity category) {
		return favoriteCategoryRepository.findByUserAndCategory(user,category);
	}
	public List<CategoryEntity> getFavoriteCategoriesByUser(UserEntity user) {
        List<FavoriteCategoryEntity> favoriteCategories = favoriteCategoryRepository.findByUser(user);
        // Extract the CategoryEntities from the FavoriteCategoryEntities
        return favoriteCategories.stream()
                .map(FavoriteCategoryEntity::getCategory)
                .collect(Collectors.toList());
    }
}
