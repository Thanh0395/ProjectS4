package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.repository.RoleRepository;


@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;
	
	public List<RoleEntity> getAll(){
		return roleRepository.findAll();
	}
	
	public RoleEntity create(RoleEntity roleEntity) {
		return roleRepository.save(roleEntity);
	}
	
	public RoleEntity getRoleById(int id) {
		return roleRepository.findById(id).get();
	}

	public boolean checkRoleExists(String string) {
		
		return false;
	}
	
	public List<RoleEntity> getRolesByUserRoles(List<UserRoleEntity> userRoles) {
	    List<RoleEntity> rolesDb = new ArrayList<>();

	    for (UserRoleEntity userRoleEntity : userRoles) {
	        rolesDb.add(userRoleEntity.getRole());
	    }

	    return rolesDb;
	}	
	
	public RoleEntity getRoleByRoleName(String roleName) {
		return roleRepository.findByName(roleName);
	}
}
