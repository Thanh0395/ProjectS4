package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.PostQuestionRepository;

@Service
public class PostQuestionService {

	@Autowired
	private PostQuestionRepository postQuestionRepository;
}
