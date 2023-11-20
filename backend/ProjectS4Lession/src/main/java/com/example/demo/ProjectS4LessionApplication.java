package com.example.demo;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.demo.config.initializationProperties;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.PostService;
import com.example.demo.service.RoleService;
import com.example.demo.service.StorageService;
import com.example.demo.service.UserService;

@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
public class ProjectS4LessionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectS4LessionApplication.class, args);
	}
	
	@Bean
	BCryptPasswordEncoder brBCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	CommandLineRunner init(StorageService storageFileService) {
		return (arg -> {
			storageFileService.init();
		});
	}
	
	@Bean
	public CommandLineRunner run(
			RoleService roleService, 
			UserService userService, 
			PostService postService,
			initializationProperties appConfig) {
	    return args -> {
	    	boolean initializationEnabled = appConfig.isInitializationEnabled();
	        if (initializationEnabled && !checkUserExist(userService)) {
				roleService.create(new RoleEntity("USER"));
				roleService.create(new RoleEntity("TEACHER"));
				roleService.create(new RoleEntity("ADMIN"));
				
				userService.createUser(new UserEntity("tanhung.nguyen270799@gmail.com", "Tan Hung 01", Date.valueOf("1999-07-27"), "avt", "1234567"));
				userService.createUser(new UserEntity("tanhung02@gmail.com", "Tan Hung 02" ,Date.valueOf("1999-07-27"), "avt", "1234567"));
				userService.createUser(new UserEntity("tanhung03@gmail.com", "Tan Hung 03", Date.valueOf("1999-07-27"), "avt", "1234567"));
				
				userService.createUser(new UserEntity("tranphamduythanh@gmail.com", "Duy Thanh 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("duythanh02@gmail.com", "Duy Thanh 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("duythanh03@gmail.com", "Duy Thanh 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.createUser(new UserEntity("Phamtrungnhan15dqt22@gmail.com", "Trung Nhan 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("trungnhan02@gmail.com", "Trung Nhan 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("trungnhan03@gmail.com", "Trung Nhan 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.createUser(new UserEntity("trancaotiensi020501@gmail.com", "Tien Sy 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("tiensy02@gmail.com", "Tien Sy 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("tiensy03@gmail.com", "Tien Sy 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.createUser(new UserEntity("doananhphamuk@gmail.com", "Doan Pham 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("doanpham02@gmail.com", "Doan Pham 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("doanpham03@gmail.com", "Doan Pham 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.addUserRole(1, 1);
				userService.addUserRole(2, 2);
				userService.addUserRole(3, 3);
				
				userService.addUserRole(4, 1);
				userService.addUserRole(5, 2);
				userService.addUserRole(6, 3);
				
				userService.addUserRole(7, 1);
				userService.addUserRole(8, 2);
				userService.addUserRole(9, 3);
				
				userService.addUserRole(10, 1);
				userService.addUserRole(11, 2);
				userService.addUserRole(12, 3);
				
				userService.addUserRole(13, 1);
				userService.addUserRole(14, 2);
				userService.addUserRole(15, 3);

	        } 
	        if(!checkPostExist(postService)) {
				postService.createPost(
						new PostEntity(
								"video01", "image01", 100, 100, "title01", "content01", "lesson", new Timestamp(new java.util.Date().getTime())));
				postService.createPost(
						new PostEntity(
								"video02", "image02", 200, 200, "title02", "content02", "test", new Timestamp(new java.util.Date().getTime())));
				postService.createPost(
						new PostEntity(
								"video03", "image03", 300, 300, "title03", "content03", "lesson", new Timestamp(new java.util.Date().getTime())));
				postService.createPost(
						new PostEntity(
								"video04", "image04", 400, 400, "title04", "content04", "test", new Timestamp(new java.util.Date().getTime())));
				postService.createPost(
						new PostEntity(
								"video05", "image05", 500, 500, "title05", "content05", "lesson", new Timestamp(new java.util.Date().getTime())));
				postService.createPost(
						new PostEntity(
								"video06", "image06", 600, 600, "title06", "content06", "test", new Timestamp(new java.util.Date().getTime())));
			}
	        else {
	            System.out.println("Initialization is disabled or records already exist.");
	        }
	    };
	}

	private boolean checkUserExist(UserService userService) {
	    //boolean roleExists = roleService.checkRoleExists("ROLE_USER");
	    boolean usersExist = userService.checkAnyUsersExist();
	    return usersExist;
	}
	
	private boolean checkPostExist(PostService postService) {
		boolean postsExist = postService.checkAnyPostExist();
		return postsExist;
	}

}
