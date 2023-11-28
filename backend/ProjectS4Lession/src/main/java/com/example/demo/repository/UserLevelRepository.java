package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserLevelEntity;


@Repository
public interface UserLevelRepository extends JpaRepository<UserLevelEntity, Integer> {
List<UserLevelEntity> findByUserUserId(int userId);
}
