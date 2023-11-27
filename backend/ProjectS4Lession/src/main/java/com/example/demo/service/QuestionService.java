package com.example.demo.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.QuestionEntity;
import com.example.demo.repository.QuestionRepository;

@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepository;
	
	//Thanh
	public List<QuestionEntity> getQuestionsByPostId(int postId) {
        return questionRepository.findByPostQuestionsPostPostId(postId);
    }
}
