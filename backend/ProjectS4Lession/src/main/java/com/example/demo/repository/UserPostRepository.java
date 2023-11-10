package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserPostEntiy;


@Repository
public interface UserPostRepository extends JpaRepository<UserPostEntiy, Integer> {

}
