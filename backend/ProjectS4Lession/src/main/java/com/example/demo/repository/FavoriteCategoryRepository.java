package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.FavoriteCategoryEntity;


@Repository
public interface FavoriteCategoryRepository extends JpaRepository<FavoriteCategoryEntity, Integer> {

}
