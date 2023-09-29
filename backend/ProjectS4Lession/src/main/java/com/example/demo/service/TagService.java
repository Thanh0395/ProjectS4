package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.TagRepository;

@Service
public class TagService {

	@Autowired
	private TagRepository tagRepository;
}
