package com.example.demo.advice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.CustomAuthenticationException;
import com.example.demo.exception.EmptyFileException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.exception.ResourceAlreadyExistsException;
import com.example.demo.exception.VerificationCodeMismatchException;


@RestControllerAdvice
public class ApplicationExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException ex){
		Map<String, String> errorMap = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(error -> {
			errorMap.put(error.getField(), error.getDefaultMessage());
		});
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NotFoundException.class)
	public Map<String, String> handleBusinessException(NotFoundException ex){
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("Error Message ", ex.getMessage());
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BadRequestException.class)
	public Map<String, String> handleBadRequestException(BadRequestException ex){
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("Error Message", ex.getMessage());
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomAuthenticationException.class)
	public Map<String, String> handleCustomAuthenticationException(CustomAuthenticationException ex){
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("Error Message", ex.getMessage());
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.CONFLICT)
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public Map<String, String> handleResourceAlreadyExistsException (ResourceAlreadyExistsException ex){
		Map<String, String> errorMap = new HashMap<String, String>();
		errorMap.put("Error Message", ex.getMessage());
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(VerificationCodeMismatchException.class)
	public Map<String, String> handleVerificationCodeMismatchException (VerificationCodeMismatchException ex){
		Map<String, String> errorMap = new HashMap<String, String>();
		errorMap.put("Error Message", ex.getMessage());
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(EmptyFileException.class)
	public Map<String, String> handleEmptyFileException(EmptyFileException ex){
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("Error Message ", ex.getMessage());
		return errorMap;
	}
}
