package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PostQuestionEntity;

@Repository
public interface PostQuestionRepository extends JpaRepository<PostQuestionEntity, Integer> {

}
