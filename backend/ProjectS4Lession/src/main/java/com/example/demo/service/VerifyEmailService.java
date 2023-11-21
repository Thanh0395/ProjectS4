package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.VerifyEmailEntity;
import com.example.demo.repository.VerifyEmailRepository;
import java.security.SecureRandom;

@Service
public class VerifyEmailService {

	@Autowired
	private VerifyEmailRepository verifyEmailRepository;
	
	private final static int CODE_LENGTH = 5;
	
	public VerifyEmailEntity createVerifyEmail(UserEntity user) {
		VerifyEmailEntity verifyEmailEntity = VerifyEmailEntity
				.builder()
				.code(generateCode())
				.user(user)
				.build();
		return verifyEmailRepository.save(verifyEmailEntity);
	}
	
	public String generateCode() {
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        
        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomDigit = secureRandom.nextInt(10); // Generate a random digit (0-9)
            code.append(randomDigit); // Append the digit to the code
        }

        return code.toString();
    }
}
