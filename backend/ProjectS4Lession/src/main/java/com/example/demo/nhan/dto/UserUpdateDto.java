package com.example.demo.nhan.dto;

import java.util.List;

public class UserUpdateDto {
	private int userId;
    private boolean isActive;
    private String userRoleUpdate; // Assuming roles are identified by their names

    // Constructors, Getters, and Setters
    public UserUpdateDto() {
    }

    public UserUpdateDto(int userId, boolean isActive, String userRoleUpdate) {
    	this.userId = userId;
        this.isActive = isActive;
        this.userRoleUpdate = userRoleUpdate;
    }
    
    public int getUserId() {
    	return userId;
    }
    public void setUserId(int userId) {
    	this.userId =  userId;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getUserRoleUpdate() {
        return userRoleUpdate;
    }

    public void setUserRoleUpdate(String userRoleUpdate) {
        this.userRoleUpdate = userRoleUpdate;
    }
}
