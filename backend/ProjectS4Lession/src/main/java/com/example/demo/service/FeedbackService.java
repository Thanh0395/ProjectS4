package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.FeedbackEntity;
import com.example.demo.repository.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	
	public FeedbackEntity createFeedback(FeedbackEntity feedbackEntity) {
		return feedbackRepository.save(feedbackEntity);
	}
	
	public void deleteFeedback(FeedbackEntity feedbackEntity) {
		feedbackRepository.delete(feedbackEntity);
	}
}
