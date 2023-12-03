package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PostQuestionEntity;

@Repository
public interface PostQuestionRepository extends JpaRepository<PostQuestionEntity, Integer> {
	//Thanh
	List<PostQuestionEntity> findByPostPostId(int postId);
	
	List<PostQuestionEntity> findAllByPost_PostIdAndQuestion_QuestionId(int postId, Long questionId);
}
