package com.example.demo;

import java.sql.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.config.initializationProperties;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;

@SpringBootApplication
public class ProjectS4LessionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectS4LessionApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner run(RoleService roleService, UserService userService, initializationProperties appConfig) {
	    return args -> {
	    	boolean initializationEnabled = appConfig.isInitializationEnabled();
	        if (initializationEnabled && !checkRecordsExist(userService)) {
				roleService.create(new RoleEntity("ROLE_USER"));
				roleService.create(new RoleEntity("ROLE_TEACHER"));
				roleService.create(new RoleEntity("ROLE_ADMIN"));
				
				userService.createUser(new UserEntity("tanhung01@gmail.com", "Tan Hung 01", Date.valueOf("1999-07-27"), "avt", "1234567"));
				userService.createUser(new UserEntity("tanhung02@gmail.com", "Tan Hung 02" ,Date.valueOf("1999-07-27"), "avt", "1234567"));
				userService.createUser(new UserEntity("tanhung03@gmail.com", "Tan Hung 03", Date.valueOf("1999-07-27"), "avt", "1234567"));
				
				userService.createUser(new UserEntity("duythanh01@gmail.com", "Duy Thanh 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("duythanh02@gmail.com", "Duy Thanh 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("duythanh03@gmail.com", "Duy Thanh 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.createUser(new UserEntity("trungnhan01@gmail.com", "Trung Nhan 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("trungnhan02@gmail.com", "Trung Nhan 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("trungnhan03@gmail.com", "Trung Nhan 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.createUser(new UserEntity("tiensy01@gmail.com", "Tien Sy 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("tiensy02@gmail.com", "Tien Sy 02", Date.valueOf("1999-07-27"),"avt", "1234567"));
				userService.createUser(new UserEntity("tiensy03@gmail.com", "Tien Sy 03", Date.valueOf("1999-07-27"),"avt", "1234567"));
				
				userService.createUser(new UserEntity("doanpham01@gmail.com", "Doan Pham 01", Date.valueOf("1999-07-27"),"avt", "1234567"));
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

	        } else {
	            System.out.println("Initialization is disabled or records already exist.");
	        }
	    };
	}

	private boolean checkRecordsExist(UserService userService) {

	    //boolean roleExists = roleService.checkRoleExists("ROLE_USER");

	    boolean usersExist = userService.checkAnyUsersExist();

	    return usersExist;
	}

}