package com.example.demo.service;

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
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.CustomAuthenticationException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UserService userService;
	private final AuthenticationManager authenticationManager;
	
//	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
//	    try {
//	        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//	                authenticationRequest.getEmail(), authenticationRequest.getPassword()));
//
//	        // Get the authenticated user from the SecurityContext
//	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//	        UserEntity user = (UserEntity) authentication.getPrincipal();
//
//	        // Generate roles from the authenticated user
//	        List<SimpleGrantedAuthority> authorities = user.getRoles()
//	                .stream()
//	                .map(role -> new SimpleGrantedAuthority(role.getName()))
//	                .collect(Collectors.toList());
//
//	        // Generate JWT tokens
//	        String jwtToken = jwtService.generateToken(user, authorities);
//	        String jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
//
//	        return AuthenticationResponse.builder()
//	                .token(jwtToken)
//	                .refreshToken(jwtRefreshToken)
//	                .build();
//	    } catch (AuthenticationException e) {
//	        // Handle authentication failure
//	        throw new CustomAuthenticationException("Authentication failed", e);
//	    }
//	}
	
//	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
//	    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//	            authenticationRequest.getEmail(), authenticationRequest.getPassword()));
//	    
//	    Optional<UserEntity> user = userRepository.findByEmail(authenticationRequest.getEmail());
//
//	    Set<RoleEntity> roles = user.get().getRoles();
//	    
//	    Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
//	    		roles.stream()
//	            .map(role -> new SimpleGrantedAuthority(role.getName()))
//	            .collect(Collectors.toList());
//
//	    var JwtToken = jwtService.generateToken(user, authorities);
//	    var JwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
//	    
//	    return AuthenticationResponse.builder().token(JwtToken).refreshToken(JwtRefreshToken).build();
//	}

	
	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getEmail(), authenticationRequest.getPassword()));
		UserEntity user = userRepository.findByEmail(authenticationRequest.getEmail()).get();
		List<RoleEntity> role = null;
//		if(user != null) {
//			role = roleCustomRepository.getRole(user); //Jpa co ho tro phuong thuc
//		}
		
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		List<RoleEntity> set = new ArrayList<RoleEntity>();
		if(user != null) {
			try {
				set = userService.getRolesByUserRole(user);
			} catch (NotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		//role.stream().forEach(c -> set.add(new RoleEntity(c.getName())));
		//user.setRoles(set);
		set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
		//chuyen doi user va authorities thanh chuoi token
		var JwtToken = jwtService.generateToken(user, authorities);
		var JwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
		return AuthenticationResponse.builder().token(JwtToken).refreshToken(JwtRefreshToken).build();
	}
}
