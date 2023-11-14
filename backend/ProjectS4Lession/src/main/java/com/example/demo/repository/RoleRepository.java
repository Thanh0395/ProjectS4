package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserRoleEntity;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {
	RoleEntity findByName(String name);
	//List<RoleEntity> findByUserRoles(List<UserRoleEntity> userRoles);
}
