package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.FeedbackEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	//Thanh
	public List<FeedbackEntity> getFeedbacksByPostId(int postId) {
        return feedbackRepository.findByPostPostIdAndStatusOrderByCreatedAtDesc(postId, "approved");
    }
	
	public List<FeedbackEntity> getAllFeedbacksByPostId(int postId) {
        return feedbackRepository.findByPostPostIdOrderByCreatedAtDesc(postId);
    }
	
	public FeedbackEntity getFeedbackById(int feedbackId) {
		FeedbackEntity feedback = feedbackRepository.findById(feedbackId).orElse(null);
		if (feedback != null) return feedback;
		else return null;
    }
	
	public FeedbackEntity addFeedback(String comment, PostEntity post, UserEntity user) {
		FeedbackEntity feedback = new FeedbackEntity();
		feedback.setContent(comment);
		feedback.setPost(post);
		feedback.setStatus("approved");
		feedback.setUser(user);
		feedbackRepository.save(feedback);
		return feedback;
	}
}
