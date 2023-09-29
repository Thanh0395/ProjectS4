package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.GemRepository;

@Service
public class GemService {

	@Autowired
	private GemRepository gemRepository;
}
