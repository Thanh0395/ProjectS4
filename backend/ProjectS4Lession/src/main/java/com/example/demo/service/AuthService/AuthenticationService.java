package com.example.demo.service.AuthService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.auth.AuthenticationRequest;
import com.example.demo.auth.AuthenticationResponse;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.dto.AuthDto.ActiveUserRequestDto;
import com.example.demo.dto.AuthDto.AdminAddPermission;
import com.example.demo.dto.AuthDto.AdminAddUserRequestDto;
import com.example.demo.dto.AuthDto.ChangePasswordRequest;
import com.example.demo.dto.AuthDto.ResetPasswordRequestDto;
import com.example.demo.dto.AuthDto.VerifyEmailResponseDto;
import com.example.demo.entity.EmailEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.entity.VerifyEmailEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.CustomAuthenticationException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.exception.ResourceAlreadyExistsException;
import com.example.demo.exception.VerificationCodeMismatchException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserPostRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserRoleRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import com.example.demo.service.VerifyEmailService;

import static com.example.demo.constans.GlobalStorage.DEFAULT_ROLE;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.BadCredentialsException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository userRepository;
	private final JwtService jwtService;
	@Autowired
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private final RoleRepository roleRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private final VerifyEmailService verifyEmailService;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private UserPostRepository userPostRepository;
	
	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest)
			throws NotFoundException, CustomAuthenticationException, BadRequestException 
	{
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
					authenticationRequest.getPassword()));
			UserEntity user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(
					() -> new NotFoundException("Not found your account with email " + authenticationRequest.getEmail()));

			List<RoleEntity> set = userService.getRolesByUserRole(user);
			
			Boolean isActive = user.isActive();
			Boolean isPwdMatch = passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword());
			if(!isActive) {
				throw new BadRequestException("Your account is not active!");
			}
			if(!isPwdMatch) {
				throw new BadRequestException("Password is not correct!");
			}

			Collection<SimpleGrantedAuthority> authorities = set.stream()
					.map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

			var JwtToken = jwtService.generateToken(user, authorities);
			var JwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
			UserResponseDto userResponse = userMapper.UserEntityToUserResponse(user);
			userResponse.setRoles(set);
			return AuthenticationResponse.builder().user(userResponse).token(JwtToken).refreshToken(JwtRefreshToken).build();
		} catch (BadCredentialsException e) {
			throw new CustomAuthenticationException("Invalid email or password");
		} catch (NotFoundException e) {
			throw new NotFoundException("Not found your account with email " + authenticationRequest.getEmail());
		}
	}
	
	public UserResponseDto register(UserEntity user) throws NotFoundException, ResourceAlreadyExistsException {
		Optional<UserEntity> userDb = userRepository.findByEmail(user.getEmail());
		if(userDb.isPresent()) {
			throw new ResourceAlreadyExistsException("Your account already exist with email " + user.getEmail());
		}
		user.setAvatar("uploads/images/user/User_default.jpg");
    	UserEntity userCreated = userService.createUser(user);
    	UserResponseDto userResponseDto = userMapper.UserEntityToUserResponse(userCreated);
    	AddPermission(userCreated.getEmail(), DEFAULT_ROLE);
	    return userResponseDto;
	}
	
	public UserRoleEntity AddPermission(String email, String roleName) throws NotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Not found your account with email " + email));

        RoleEntity role = roleRepository.findByName(roleName);
        if(role== null) {
        	throw new NotFoundException("Role not found with Role Name: " + roleName);
        }

        UserRoleEntity userRoleEntity = UserRoleEntity.builder()
                .user(user)
                .role(role)
                .build();
        return userRoleRepository.save(userRoleEntity);
    }
	
	public VerifyEmailResponseDto CreateVerifyEmailWithUser(EmailEntity email) 
			throws NotFoundException 
	{
		UserEntity userDb = userRepository.findByEmail(email.getToEmail())
				.orElseThrow(() -> new NotFoundException("Not found your account with email " + email.getToEmail()));
		
		VerifyEmailEntity verifyEmailCreated = verifyEmailService.createVerifyEmail(userDb);
		VerifyEmailResponseDto verifyEmailResponseDto = VerifyEmailResponseDto
				.builder()
				.action(email.getAction())
				.code(verifyEmailCreated.getCode())
				.email(userDb.getEmail())
				.message("Create verify with email : " + userDb.getEmail() + " and code : " + verifyEmailCreated.getCode())
				.build();
		return verifyEmailResponseDto;
	}
	
	public void ActiveUser(ActiveUserRequestDto activeUserRequestDto) 
			throws NotFoundException, VerificationCodeMismatchException, BadRequestException 
	{
		UserEntity user = userRepository.findByEmail(activeUserRequestDto.getEmail())
				.orElseThrow(() -> new NotFoundException("Not found user with email :" + activeUserRequestDto.getEmail()));
		boolean isActive = user.isActive();
		if (isActive) {
		    throw new ResourceAlreadyExistsException("Your account is already active");
		}
		boolean isVerify = verifyEmailService.checkVerifyEmailToActiveLogin(user, activeUserRequestDto.getCode());
		if(isVerify) {
			user.setActive(true);
			userRepository.save(user);
		}
	}
	
	public void resestPassword(ResetPasswordRequestDto request) 
			throws NotFoundException, BadRequestException, VerificationCodeMismatchException
	{
		if(request.getNewPassword().equals(request.getConfirmPassword())) {
			UserEntity user = userRepository.findByEmail(request.getEmail())
					.orElseThrow(() -> new NotFoundException("Not found your account with email :" + request.getEmail()));
			boolean isVerify = verifyEmailService.checkVerifyEmailToResetPassword(user, request.getCode());
			if(isVerify) {
				user.setPassword(passwordEncoder.encode(request.getNewPassword()));
				userRepository.save(user);
			}
		}else {
			throw new BadRequestException("Confirm password not correct!");
		}
	}
	
	//chua can dung
	public UserEntity checkUser(String email, String code)
			throws NotFoundException, BadRequestException
	{
		UserEntity user = userRepository.findByEmail(email)
				.orElseThrow(() -> new NotFoundException("Not found your account with email " + email));
		boolean isVerify = verifyEmailService.checkVerifyEmailExist(user);
		boolean isActive = user.isActive();
		if(!isVerify) {
			throw new BadRequestException("Your account not verify email!Please send email to get verify code!");
		}
		if(!isActive) {
			throw new BadRequestException("Your account not active!");
		}
		return user;
	}
	
	public void changePassword(ChangePasswordRequest request) 
			throws BadRequestException, NotFoundException
	{
		UserEntity userDb = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new NotFoundException("Not found your account with email " + request.getEmail()));
		if(!request.getNewPassword().equals(request.getConfirmPassword())) {
			throw new BadRequestException("Confirm password not correct!");
		}
		Boolean isActive = userDb.isActive();
		if(!isActive) {
			throw new BadRequestException("Your account is not active!");
		}
		Boolean isPwdMatch = passwordEncoder.matches(request.getOldPassword(), userDb.getPassword());
		if(!isPwdMatch){
			throw new BadRequestException("Old password not correct!");
		}
		userDb.setPassword(passwordEncoder.encode(request.getNewPassword()));
		userRepository.save(userDb);
		
	}
	
	public UserResponseDto adminAddUser(AdminAddUserRequestDto request) 
			throws ResourceAlreadyExistsException 
	{
		Optional<UserEntity> userDb = userRepository.findByEmail(request.getEmail());
		if(userDb.isPresent()) {
			throw new ResourceAlreadyExistsException("Your account already exist with email " + request.getEmail());
		}
		
		List<RoleEntity> roles = new ArrayList<>();;
		if (!request.getListNameRole().isEmpty() && request.getListNameRole() != null) {
		    for (String nameRole : request.getListNameRole()) {
		        RoleEntity role = roleRepository.findByName(nameRole);
		        if (role != null) {
		            roles.add(role);
		        }
		    }
		}

		
		UserEntity user = UserEntity
				.builder()
				.name(request.getName())
				.dateOfBirth(request.getDateOfBirth())
				.avatar("uploads/images/user/User_default.jpg")
				.email(request.getEmail())
				.isActive(Boolean.parseBoolean(request.getIsActive()))
				.password(request.getPassword())
				.build();
    	UserEntity userCreated = userService.createUser(user);
    	UserResponseDto userResponseDto = null;
    	if(userCreated != null) {
    		userResponseDto = userMapper.UserEntityToUserResponse(userCreated);
    		userService.createUserWithRoles(userCreated, roles);
    	}
    	return userResponseDto;
	}
	
	public UserResponseDto AdminDeleteUser(int userId) throws NotFoundException, BadRequestException {
		UserEntity userDb = userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("Not found user with id :" + userId));
		List<PostEntity> postExist = postRepository.findByUserUserIdAndDeletedAtIsNull(userDb.getUserId());
		List<PostEntity> postBought = userPostRepository.findLesonsBoughtUserId(userDb.getUserId());
		List<RoleEntity> roles = userService.getRolesByUserRole(userDb);
		for (RoleEntity role : roles) {
	        if ("ADMIN".equals(role.getName())) {
	            throw new BadRequestException("Couldn't delete user with role Admin");
	        }
	    }
		if (!postExist.isEmpty()) {
	        throw new BadRequestException("Couldn't delete user with existing course!");
	    }
		if(!postBought.isEmpty()) {
			throw new BadRequestException("Couldn't delete user bought course!");
		}
		UserResponseDto userDeletedReponse = userMapper.UserEntityToUserResponse(userDb);
		userRepository.deleteById(userId);
		return userDeletedReponse;
	}
	
	public UserResponseDto AdminAddPermission(AdminAddPermission request) throws NotFoundException, BadRequestException {
		UserEntity userDb = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new NotFoundException("Not found user with email :" + request.getEmail()));;
		if(request.getListNameRole() == null) {
			throw new BadRequestException("Role Name cound't empty!");
		}
		if(request.getListNameRole().isEmpty()) {
			throw new BadRequestException("Role cound't empty!");
		}
		List<RoleEntity> rolesToAdd = new ArrayList<>();;
		List<RoleEntity> userRoles = userService.getRolesByUserRole(userDb);
		List<String> rolesNameRequest = request.getListNameRole();
		for (String roleName : rolesNameRequest) {
	        // Check if the role is not already associated with the user, then add it
	        boolean roleExists = userRoles.stream().anyMatch(role -> role.getName().equals(roleName));
	        if (!roleExists) {
	            RoleEntity role = roleRepository.findByName(roleName);
	            if (role != null) {
	            	rolesToAdd.add(role);
	            } else {
	                throw new NotFoundException("Role with name " + roleName + " not found.");
	            }
	        }
	    }
		userService.createUserWithRoles(userDb, rolesToAdd);
		UserResponseDto userResponse = userMapper.UserEntityToUserResponse(userDb);
		return userResponse;
	}
}
