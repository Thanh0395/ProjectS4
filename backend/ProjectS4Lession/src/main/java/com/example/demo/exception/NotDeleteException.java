package com.example.demo.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotDeleteException extends Exception{

	public NotDeleteException(String message) {
		super(message);
	}
	
	public NotDeleteException(String message, Throwable cause) {
        super(message, cause);
    }
}
