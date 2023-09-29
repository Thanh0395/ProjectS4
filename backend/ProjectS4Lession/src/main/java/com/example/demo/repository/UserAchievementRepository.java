package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserAchievementEntity;


@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievementEntity, Integer> {

}
