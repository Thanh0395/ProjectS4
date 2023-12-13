package com.example.demo.nhan.dto;

import java.sql.Date;
import java.util.List;

public class UserDetailDto {
	
    private int userId;
    private String avatar;
    private String userName;
    private String email;
    private List<String> userRoles;
    private Date dateOfBirth;

    public UserDetailDto() {

    }
    
    public int getUserId() {
    	return userId;
    }
    
    public void setUserId(int userId) {
       this.userId = userId;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<String> userRoles) {
        this.userRoles = userRoles;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

}
