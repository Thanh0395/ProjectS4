package com.example.demo.service.AuthService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.demo.auth.AuthenticationRequest;
import com.example.demo.auth.AuthenticationResponse;
import com.example.demo.dto.UserLoginResponseDto;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.CustomAuthenticationException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.BadCredentialsException;

//Other imports...

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	@Autowired
	private UserMapper userMapper;

	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest)
			throws NotFoundException, CustomAuthenticationException {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
					authenticationRequest.getPassword()));

			UserEntity user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(
					() -> new NotFoundException("User not found with email: " + authenticationRequest.getEmail()));

			List<RoleEntity> set = userService.getRolesByUserRole(user);

			Collection<SimpleGrantedAuthority> authorities = set.stream()
					.map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

			var JwtToken = jwtService.generateToken(user, authorities);
			var JwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
			UserLoginResponseDto userLoginResponse = userMapper.UserEntityToUserLoginResponse(user);
			userLoginResponse.setRoles(set);
			return AuthenticationResponse.builder().user(userLoginResponse).token(JwtToken).refreshToken(JwtRefreshToken).build();
		} catch (BadCredentialsException e) {
			// Invalid email or password
			throw new CustomAuthenticationException("Invalid email or password");
		} catch (NotFoundException e) {
			// User not found
			throw new NotFoundException("User not found with email: " + authenticationRequest.getEmail());
		}
	}
}
