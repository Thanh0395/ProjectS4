package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TagPostEntity;


@Repository
public interface TagPostRepository extends JpaRepository<TagPostEntity, Integer> {

}
