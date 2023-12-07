package com.example.demo.thanh.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CategoryDto;
import com.example.demo.service.CategoryService;
import com.example.demo.thanh.service.HttpRequestService;

import jakarta.servlet.http.HttpServletRequest;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/category")
public class ThanhCategoryController {
	
	@Autowired
	private CategoryService cateService;
	
	@GetMapping("/analyze-list")
	public ResponseEntity<List<CategoryDto>> getAllTag() {
		List<CategoryDto> cateDtos = cateService.countTypePerCategory();
		return new ResponseEntity<>(cateDtos, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addLesson(HttpServletRequest request, @RequestBody CategoryDto cateDto) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				
			}
				return new ResponseEntity<>("Do not allow to add!", HttpStatus.UNAUTHORIZED);
			
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
