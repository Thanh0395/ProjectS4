package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.auth.AuthenticationRequest;
import com.example.demo.auth.AuthenticationResponse;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.dto.AuthDto.ActiveUserRequestDto;
import com.example.demo.dto.AuthDto.AddPermissionDto;
import com.example.demo.dto.AuthDto.ChangePasswordRequest;
import com.example.demo.dto.AuthDto.RegisterRequestDto;
import com.example.demo.dto.AuthDto.ResetPasswordRequestDto;
import com.example.demo.dto.AuthDto.VerifyEmailResponseDto;
import com.example.demo.entity.EmailEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRoleEntity;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.exception.ResourceAlreadyExistsException;
import com.example.demo.exception.VerificationCodeMismatchException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import com.example.demo.service.AuthService.AuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private final UserService userService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private EmailService emailService;
    

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) 
    		throws NotFoundException, BadRequestException
    {
    	
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }
    
    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        response.setStatus(HttpStatus.NO_CONTENT.value());
    }
    
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody RegisterRequestDto registerRequestDto) 
    		throws ResourceAlreadyExistsException, NotFoundException 
    {
    	UserEntity user = userMapper.RegisterRequestDtoToUserEntity(registerRequestDto);
    	UserResponseDto userCreatedWithDefaultRole = authenticationService.register(user);
    	return new ResponseEntity<>(userCreatedWithDefaultRole, HttpStatus.OK);	
    }
    
    @PostMapping("/add-permission")
    public ResponseEntity<String> addPermission(@RequestBody AddPermissionDto addPermissionDto) 
    		throws NotFoundException 
    {
    	UserRoleEntity userRoleEntity = authenticationService.AddPermission(addPermissionDto.getEmail(), addPermissionDto.getRoleName());
    	return new ResponseEntity<>("Add Permisson Success", HttpStatus.OK);
    }
    
    @PostMapping("/create-verify-email")
    public ResponseEntity<VerifyEmailResponseDto> CreateVerifyEmail(@RequestBody EmailEntity email) 
    		throws NotFoundException ,BadRequestException
    {
    	VerifyEmailResponseDto verifyEmailResponseDto = authenticationService.CreateVerifyEmailWithUser(email);
    	try {    		
    		emailService.sendMailVerifyCode(email, verifyEmailResponseDto.getCode());
    	}catch (Exception e) {
    		throw new BadRequestException("Error occurred while sending the email: " + e.getMessage());
		}
    	return new ResponseEntity<>(verifyEmailResponseDto, HttpStatus.OK);
    }
    
    
    @PostMapping("/active-user")
    public ResponseEntity<String> activeLogin(@RequestBody ActiveUserRequestDto activeLoginRequestDto) 
    		throws NotFoundException, VerificationCodeMismatchException, BadRequestException 
    {
    	authenticationService.ActiveUser(activeLoginRequestDto);
    	return new ResponseEntity<>("Account activation success", HttpStatus.OK);
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<VerifyEmailResponseDto> forgotPassword(@RequestBody EmailEntity email) 
    		throws BadRequestException, NotFoundException
    {
    	VerifyEmailResponseDto verifyEmailResponseDto = authenticationService.CreateVerifyEmailWithUser(email);
    	try {    		
    		emailService.sendMailVerifyCode(email, verifyEmailResponseDto.getCode());
    	}catch (Exception e) {
    		throw new BadRequestException("Error occurred while sending the email: " + e.getMessage());
		}
//    	authenticationService.forgotPassword(email);
    	return new ResponseEntity<>(verifyEmailResponseDto, HttpStatus.OK);
    }     
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequestDto request) 
    		throws NotFoundException, BadRequestException, VerificationCodeMismatchException   		
    {
    	authenticationService.resestPassword(request);
    	return new ResponseEntity<>("Reset password success", HttpStatus.OK);
    }
    
    @PostMapping("change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request)
    		throws NotFoundException, BadRequestException
    {
    	authenticationService.changePassword(request);
    	return new ResponseEntity<>("Change password sucess", HttpStatus.OK);
    }
}

