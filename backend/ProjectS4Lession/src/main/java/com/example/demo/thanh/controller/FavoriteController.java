package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.FavoriteCategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.CategoryService;
import com.example.demo.service.FavoriteCategoryService;
import com.example.demo.service.PostService;
import com.example.demo.service.UserService;
import com.example.demo.thanh.dto.LessonDto;
import com.example.demo.thanh.service.HttpRequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/favorite")
public class FavoriteController {
	@Autowired
	private UserService userService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private FavoriteCategoryService faCaService;
	@Autowired
	private PostService postService;

	@PostMapping("/add/{categorytId}")
	public ResponseEntity<String> likeCategory(HttpServletRequest request, @PathVariable int categorytId) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity user = userService.getUserByEmail(useEmail);
			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
			}

			CategoryEntity cate = categoryService.getCategoryById(categorytId);
			if (cate == null) {
				return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
			}
			List<FavoriteCategoryEntity> listCate = faCaService.findByUserAndCategory(user, cate);
			if (listCate.isEmpty()) {
				FavoriteCategoryEntity favCate = new FavoriteCategoryEntity();
				favCate.setUser(user);
				favCate.setCategory(cate);
				faCaService.createFavoriteCategory(favCate);
				return new ResponseEntity<>("Successfully added favorites", HttpStatus.OK);
			} else {
				faCaService.deleteFavoriteCategory(listCate.get(0));
				return new ResponseEntity<>("Successfully removed favorites", HttpStatus.OK);
			}

		} catch (NotFoundException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to add favorites", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/category")
	public ResponseEntity<List<CategoryDto>> listFavCate(HttpServletRequest request) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity user = userService.getUserByEmail(useEmail);
			List<CategoryEntity> listCate = categoryService.getAllCategory();
			List<CategoryEntity> listFavCate = faCaService.getFavoriteCategoriesByUser(user);
			List<CategoryDto> cateDtos = new ArrayList<>();
			cateDtos = listCate
					.stream().map(cate -> new CategoryDto(cate.getCategoryId(), cate.getCategoryName(),
							cate.getFeatureImage(), listFavCate.contains(cate) ? true : false))
					.collect(Collectors.toList());
			return new ResponseEntity<List<CategoryDto>>(cateDtos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/lesson")
	public ResponseEntity<List<LessonDto>> listFavLesson(HttpServletRequest request) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity user = userService.getUserByEmail(useEmail);
			List<CategoryEntity> listFavCate = faCaService.getFavoriteCategoriesByUser(user);
			List<PostEntity> allLessonEntity = postService.getTop5PostsForEachCategory("lesson", listFavCate);
			List<LessonDto> lessonDto = new ArrayList<>();
			lessonDto = allLessonEntity.stream()
					.map(lesson -> new LessonDto(lesson.getPostId(), lesson.getFeatureImage(), lesson.getTitle(),
							lesson.getContent(), lesson.getPrice(),
							lesson.getUser() != null ? lesson.getUser().getUserId() : -1,
							lesson.getUser() != null ? lesson.getUser().getName() : "Anonymous",
							lesson.getCategory() != null ? lesson.getCategory().getCategoryId() : -1,
							lesson.getCategory() != null ? lesson.getCategory().getCategoryName() : "Uncategory",
							lesson.getCreatedAt(), lesson.getUpdatedAt()))
					.collect(Collectors.toList());

			return new ResponseEntity<>(lessonDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
