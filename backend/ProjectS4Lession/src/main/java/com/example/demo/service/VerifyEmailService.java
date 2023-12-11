package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.VerifyEmailEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.VerificationCodeMismatchException;
import com.example.demo.repository.VerifyEmailRepository;
import java.security.SecureRandom;
import java.util.List;

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
	
	public boolean checkVerifyEmailToActiveLogin(UserEntity user, String code) 
			throws BadRequestException, VerificationCodeMismatchException
	{
	    VerifyEmailEntity latestVerifyEmail = verifyEmailRepository.findFirstByUserOrderByCreatedAtDesc(user);
	    if(latestVerifyEmail == null) {
	    	throw new BadRequestException("Please send email to get verify code!");
	    }
	    if (!latestVerifyEmail.getCode().equals(code)) {
	        throw new VerificationCodeMismatchException("Verification code does not match!");
	    }
	    return true;
	}
	
	public boolean checkVerifyEmailToResetPassword(UserEntity user, String code) 
			throws BadRequestException, VerificationCodeMismatchException
	{
	    VerifyEmailEntity latestVerifyEmail = verifyEmailRepository.findFirstByUserOrderByCreatedAtDesc(user);
	    if(latestVerifyEmail == null) {
	    	throw new BadRequestException("Please send email to get verify code!");
	    }
	    if (!latestVerifyEmail.getCode().equals(code)) {
	        throw new VerificationCodeMismatchException("Verification code does not match!");
	    }
	    return true;
	}

	public boolean checkVerifyEmailExist(UserEntity user) {
	    List<VerifyEmailEntity> allVerifyEmailsByUser = verifyEmailRepository.findAllByUserOrderByCreatedAtDesc(user);
	    return !allVerifyEmailsByUser.isEmpty();
	}
}
