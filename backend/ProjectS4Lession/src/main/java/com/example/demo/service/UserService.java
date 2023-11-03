package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;
		
	public List<UserEntity> getAll(){
		List<UserEntity> users = userRepository.findAll();
	    return users;
	}
	
	public UserEntity createUser(UserEntity userEntity){
		return userRepository.save(userEntity);
	}
	
	public UserEntity getUserById(int id) throws NotFoundException {
	    return userRepository.findById(id)
	            .orElseThrow(() -> new NotFoundException("User not found with id : " + id));
	}
	
	public boolean deleteUserById(int id) throws NotFoundException {
		if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            throw new NotFoundException("User not found with id : " + id);
        }
	}
	
	public UserEntity updateUser(UserEntity user) throws NotFoundException {
		UserEntity userDb = userRepository.findById(user.getUserId())
				.orElseThrow(() -> new NotFoundException("Update faild!. User not found with id : " + user.getUserId()));
		if(userDb != null) {
			user.setCreatedAt(userDb.getCreatedAt());
			return userRepository.save(user);
		}
		return null;
	}
	
	public UserEntity getUserByEmail(String email) throws NotFoundException {
		System.out.println("Searching for user with email: " + email);
	    return userRepository.findByEmail(email)
	            .orElseThrow(() -> new NotFoundException("User not found with email: " + email));
	}
	
	public UserEntity createUserWithRoles(UserEntity user, List<RoleEntity> roles) {
        // Save user to get the user_id generated by the database
        UserEntity savedUser = userRepository.save(user);

        // Create UserRoleEntity objects and associate user and roles
        List<UserRoleEntity> userRoles = new ArrayList<>();
        for (RoleEntity role : roles) {
            UserRoleEntity userRole = new UserRoleEntity();
            userRole.setUser(savedUser);
            userRole.setRole(role);
            userRoles.add(userRole);
        }

        // Save user roles
        userRoleRepository.saveAll(userRoles);

        // Update the user entity with the roles
        savedUser.setUserRoles(userRoles);
        return savedUser;
    }
	
	public UserRoleEntity addUserRole(int userId, int roleId) throws NotFoundException {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));

        RoleEntity role = roleRepository.findById(roleId)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + roleId));

        UserRoleEntity userRoleEntity = UserRoleEntity.builder()
                .user(user)
                .role(role)
                .build();
        return userRoleRepository.save(userRoleEntity);
    }
	
	public void deleteUserRole(int userRoleId) throws NotFoundException {
        if (userRoleRepository.existsById(userRoleId)) {
            userRoleRepository.deleteById(userRoleId);
        } else {
            throw new NotFoundException("User role not found with id: " + userRoleId);
        }
    }

	
//	public void addRoleToUser(String email, int roleId) throws NotFoundException {
//        // Find the user by email
//        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email: " + email));
//        RoleEntity role = roleRepository.findById(roleId).get();
//        user.addRole(role);
//        userRepository.save(user);
//    }
//	
//	public UserEntity removeRoleFromUser(int userId, int roleId) throws NotFoundException {
//        UserEntity user = userRepository.findById(userId)
//            .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
//
//        RoleEntity roleToRemove = user.getRoles().stream()
//            .filter(role -> role.getRole_id() == roleId)
//            .findFirst()
//            .orElseThrow(() -> new NotFoundException("Role not found with id: " + roleId));
//
//        user.removeRole(roleToRemove);
//        return userRepository.save(user);
//    }
	
	public boolean checkAnyUsersExist() {
		return userRepository.count() > 0;
	}
}
