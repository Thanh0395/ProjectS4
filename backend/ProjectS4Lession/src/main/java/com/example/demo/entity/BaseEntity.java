package com.example.demo.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@Data
@MappedSuperclass
public class BaseEntity {
    
    @Column(name = "created_at")
    private Timestamp createdAt;
    
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    
    @Column(name = "deleted_at")
    private Timestamp deleted_at;
    
    @PrePersist
	private void setCreatedAt() {
		this.createdAt = Timestamp.valueOf(LocalDateTime.now());
	}
	@PreUpdate
	private void setUpdateAt() {
		this.updatedAt = Timestamp.valueOf(LocalDateTime.now());
	}
}
