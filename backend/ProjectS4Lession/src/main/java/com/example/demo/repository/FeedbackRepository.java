package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.FeedbackEntity;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Integer> {

	// Thanh
	List<FeedbackEntity> findByPostPostId(int postId);

	List<FeedbackEntity> findByPostPostIdOrderByCreatedAtDesc(int postId);
	
	List<FeedbackEntity> findByOrderByCreatedAtDesc();

	List<FeedbackEntity> findByPostPostIdAndStatusOrderByCreatedAtDesc(int postId, String status);
}
