package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.VerifyEmailEntity;
import java.util.List;



@Repository
public interface VerifyEmailRepository extends JpaRepository<VerifyEmailEntity, Integer> {
	VerifyEmailEntity findByUser(UserEntity user);
	VerifyEmailEntity findByCode(String code);
	List<VerifyEmailEntity> findAllByUserOrderByCreatedAtDesc(UserEntity user);
	VerifyEmailEntity findByUserOrderByCreatedAtDesc(UserEntity user);
	VerifyEmailEntity findFirstByUserOrderByCreatedAtDesc(UserEntity user);
}
