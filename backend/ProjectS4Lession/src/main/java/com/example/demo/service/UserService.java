package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.GemEntity;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.nhan.dto.UserDetailDto;
import com.example.demo.nhan.dto.UserUpdateDto;
import com.example.demo.repository.AchievementRepository;
import com.example.demo.repository.GemRepository;
import com.example.demo.repository.PostRepository;
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
	@Autowired
	private RoleService roleService;

	private final PasswordEncoder passwordEncoder;

	public List<UserEntity> getAll() {
		List<UserEntity> users = userRepository.findAll();
		return users;
	}

	public UserEntity createUser(UserEntity userEntity) {
		userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
		return userRepository.save(userEntity);
	}

	public UserEntity getUserById(int id) throws NotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found with id : " + id));
	}

	public boolean deleteUserById(int id) throws NotFoundException {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return true;
		} else {
			throw new NotFoundException("User not found with id : " + id);
		}
	}

	public UserEntity updateUser(UserEntity user) throws NotFoundException, BadRequestException {
		UserEntity userDb = userRepository.findById(user.getUserId()).orElseThrow(
				() -> new NotFoundException("Update faild!. User not found with id : " + user.getUserId()));
		if(userDb.getEmail().equals(user.getEmail())){
			throw new BadRequestException("Can not update email!");
		}
		if (userDb != null) {
			userDb.setEmail(user.getEmail());
			userDb.setName(user.getName());
			userDb.setDateOfBirth(user.getDateOfBirth());
			userDb.setAvatar(user.getAvatar());
			userDb.setPassword(userDb.getPassword());
			userDb.setActive(userDb.isActive());
		}
		return userRepository.save(userDb);
	}

	public UserEntity getUserByEmail(String email) throws NotFoundException {
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

		userRoleRepository.saveAll(userRoles);
		savedUser.setUserRoles(userRoles);
		return savedUser;
	}

	public UserRoleEntity addUserRole(int userId, int roleId) throws NotFoundException {
		UserEntity user = userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("User not found with id: " + userId));

		RoleEntity role = roleRepository.findById(roleId)
				.orElseThrow(() -> new NotFoundException("Role not found with id: " + roleId));

		UserRoleEntity userRoleEntity = UserRoleEntity.builder().user(user).role(role).build();
		return userRoleRepository.save(userRoleEntity);
	}

	public void deleteUserRole(int userRoleId) throws NotFoundException {
		if (userRoleRepository.existsById(userRoleId)) {
			userRoleRepository.deleteById(userRoleId);
		} else {
			throw new NotFoundException("User role not found with id: " + userRoleId);
		}
	}

	public List<RoleEntity> getRolesByUserRole(UserEntity user) throws NotFoundException {
		UserEntity userDb = userRepository.findById(user.getUserId())
				.orElseThrow(() -> new NotFoundException("Not found user with id:" + user.getUserId()));
		List<UserRoleEntity> userRolesDb = null;
		List<RoleEntity> roles = new ArrayList<RoleEntity>();
		if (userDb != null) {
			userRolesDb = userDb.getUserRoles();
			roles = roleService.getRolesByUserRoles(userRolesDb);
			return roles;
		} else {
			return Collections.emptyList();
		}
	}

	public boolean checkAnyUsersExist() {
		return userRepository.count() > 0;
	}
	
    @Transactional
    public UserEntity updateUser(int userId, boolean currentActive, String userRoleUpdate) 
    	throws BadRequestException
    {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.isActive()!=currentActive) {
            user.setActive(!user.isActive());
		}

//        if (userUpdateDto.getUserRoles() != null) {
//            List<UserRoleEntity> userRoles = userUpdateDto.getUserRoles().stream()
//                .map(roleName -> userRoleRepository.findByName(roleName)
//                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
//                .collect(Collectors.toList());
//            user.setUserRoles(userRoles);
        
//        }
        //tu userId -> userRole 
        // tu userRole lay duoc  set
        RoleEntity roleEntity = new RoleEntity();
        roleEntity = roleService.getRoleByRoleName(userRoleUpdate); // tu service . getRole by Name
        List<UserRoleEntity> userRoles = userRoleRepository.findByUser(user);
        return userRepository.save(user);
    }
	
	
	

}
