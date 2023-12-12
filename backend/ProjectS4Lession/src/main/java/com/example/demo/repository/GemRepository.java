package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.GemEntity;
import com.example.demo.entity.UserEntity;


@Repository
public interface GemRepository extends JpaRepository<GemEntity, Integer> {
	List<GemEntity> findByUserUserId(int userId);
}
