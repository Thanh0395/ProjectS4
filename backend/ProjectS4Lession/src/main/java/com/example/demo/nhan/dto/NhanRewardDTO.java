package com.example.demo.nhan.dto;

public class NhanRewardDTO {

    private int rewardId;
    private String title;
    private String badge;

    // Constructors
    public NhanRewardDTO() {
    }

    public NhanRewardDTO(int rewardId, String title, String badge) {
        this.rewardId = rewardId;
        this.title = title;
        this.badge = badge;
    }

    // Getters and Setters
    public int getRewardId() {
        return rewardId;
    }

    public void setRewardId(int rewardId) {
        this.rewardId = rewardId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }
}