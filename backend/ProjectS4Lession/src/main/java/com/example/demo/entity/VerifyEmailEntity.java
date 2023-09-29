package com.example.demo.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name ="verify_email_tbl")
public class VerifyEmailEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "verify_email_id")
	private int vId;
	
	@Column(name = "code", nullable = false)
	@NotNull(message = "Code must not be null!")
	@NotBlank(message = "Code must not be left blank!")
	private String code;

	@Column(name = "created_at")
	private Timestamp createdAt;
	
	@Column(name = "expired_at")
	private Timestamp expiredAt;
	
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity user; // Owning side of the relationship
	
	@PrePersist
	private void setCreatedAt() {
		this.createdAt = Timestamp.valueOf(LocalDateTime.now());
	}
}
