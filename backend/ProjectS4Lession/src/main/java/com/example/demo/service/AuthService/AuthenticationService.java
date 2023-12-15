package com.example.demo.service.AuthService;

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
import com.example.demo.dto.AuthDto.ResetPasswordRequestDto;
import com.example.demo.dto.AuthDto.VerifyEmailResponseDto;
import com.example.demo.entity.EmailEntity;
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
import com.example.demo.repository.RoleRepository;
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
}
