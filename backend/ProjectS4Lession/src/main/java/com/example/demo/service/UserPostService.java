package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.UserPostEntity;
import com.example.demo.repository.UserPostRepository;

@Service
public class UserPostService {

	@Autowired
	private UserPostRepository userPostRepository;
	
	//Thanh
	public UserPostEntity UserPayPost(int userId, int postId) {
        List<UserPostEntity> userPosts = userPostRepository.findByUserIdAndPostIdAndNotRefunded(userId, postId);
        if (userPosts != null && !userPosts.isEmpty()) {
        	return userPosts.get(0);
        } else return null;
    }
}
