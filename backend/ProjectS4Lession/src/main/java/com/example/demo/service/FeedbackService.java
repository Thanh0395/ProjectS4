package com.example.demo.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.FeedbackEntity;
import com.example.demo.repository.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	//Thanh
	public List<FeedbackEntity> getFeedbacksByPostId(int postId) {
        return feedbackRepository.findByPostPostId(postId);
    }

}
