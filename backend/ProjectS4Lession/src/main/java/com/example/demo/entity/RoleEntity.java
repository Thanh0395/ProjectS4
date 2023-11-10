package com.example.demo.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "role_tbl")
public class RoleEntity {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private int role_id;
	
	private String name;
	
	public RoleEntity(int role_id, String name) {
		super();
		this.role_id = role_id;
		this.name = name;
	}

	public RoleEntity(String name) {
		super();
		this.name = name;
	}
	
	@OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
	@JsonIgnore
	@JsonManagedReference
	private List<UserRoleEntity> userRoles = new ArrayList<>();
}
