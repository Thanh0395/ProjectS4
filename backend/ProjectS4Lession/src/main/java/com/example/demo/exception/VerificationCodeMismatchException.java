package com.example.demo.exception;

public class VerificationCodeMismatchException extends Exception {

	public VerificationCodeMismatchException(String message) {
		 super(message);
	 }
	 
	 public VerificationCodeMismatchException(String message, Exception e) {
		 super(message, e);
	 }
}
