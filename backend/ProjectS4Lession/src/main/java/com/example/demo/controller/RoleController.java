package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.RoleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project4/roles")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
	@GetMapping("/list-role")
	public ResponseEntity<List<RoleEntity>> getAllUser(){
		List<RoleEntity> listRole = roleService.getAll();
		return new ResponseEntity<>(listRole, HttpStatus.OK);
	}
	
	@PostMapping("/create-role")
	public ResponseEntity<RoleEntity> createUser(@Valid @RequestBody RoleEntity role){
		RoleEntity roleCreated = new RoleEntity();
		roleCreated = roleService.create(role);
		return new ResponseEntity<>(roleCreated, HttpStatus.OK);
	}
	
	@GetMapping("/get-role-by-id/{id}")
	public ResponseEntity<RoleEntity> getUserById(@PathVariable int id) throws NotFoundException {
		RoleEntity role = new RoleEntity();
		role = roleService.getRoleById(id);
		return new ResponseEntity<>(role, HttpStatus.OK);
	}
	
	
}
