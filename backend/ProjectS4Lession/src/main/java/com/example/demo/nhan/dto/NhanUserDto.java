package com.example.demo.nhan.dto;

import java.util.List;

public class NhanUserDto {
    private int userId;
    private String email;
    private String name;
    private boolean isActive;
    private String avatar;
    private List<String> userRoles;


    public NhanUserDto(int userId, String email, String name, boolean isActive, String avatar, List<String> userRoles) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.isActive = isActive;
        this.avatar = avatar;
        this.userRoles = userRoles;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    // email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // isActive
    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    // avatar
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    // userRoles
    public List<String> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<String> userRoles) {
        this.userRoles = userRoles;
    }
}
