package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.FavoriteCategoryEntity;
import com.example.demo.entity.UserEntity;

@Repository
public interface FavoriteCategoryRepository extends JpaRepository<FavoriteCategoryEntity, Integer> {
	List<FavoriteCategoryEntity> findByUser(UserEntity user);
	List<FavoriteCategoryEntity> findByUserAndCategory(UserEntity user, CategoryEntity category);
}
