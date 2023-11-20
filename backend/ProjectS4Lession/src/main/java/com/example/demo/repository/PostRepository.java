package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PostEntity;


@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer>{

	List<PostEntity> findByType(String type);
}
