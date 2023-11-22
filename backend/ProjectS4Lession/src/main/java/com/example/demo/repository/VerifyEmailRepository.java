package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.VerifyEmailEntity;


@Repository
public interface VerifyEmailRepository extends JpaRepository<VerifyEmailEntity, Integer> {

	VerifyEmailEntity findByUser(UserEntity user);
}
