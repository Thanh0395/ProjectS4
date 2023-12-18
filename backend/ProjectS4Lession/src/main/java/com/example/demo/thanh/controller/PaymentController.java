package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.GemEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserPostEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.GemRepository;
import com.example.demo.service.AchievementService;
import com.example.demo.service.GemService;
import com.example.demo.service.PostService;
import com.example.demo.service.UserAchievementService;
import com.example.demo.service.UserPostService;
import com.example.demo.service.UserService;
import com.example.demo.thanh.service.HttpRequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/payment")
public class PaymentController {
	@Autowired
	private UserService userService;

	@Autowired
	private GemService gemService;
	@Autowired
	private GemRepository gemRepository;

	@Autowired
	private PostService postService;

	@Autowired
	private UserPostService userPostService;

	@Autowired
	private UserAchievementService userAchiService;

	@Autowired
	private AchievementService achiService;

	@PutMapping("/buy-lesson/{lessonId}")
	public ResponseEntity<String> buyLesson(HttpServletRequest request, @PathVariable int lessonId) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity user = userService.getUserByEmail(useEmail);
			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
			}
			UserPostEntity userBuy = userPostService.UserPayPostRefund(user.getUserId(), lessonId);
			// Mua roi thì co trong db voi 2 truong hop refund: null OR false
			if (userBuy != null && (userBuy.getIsRefunded() == null
					|| userBuy.getIsRefunded() != null && userBuy.getIsRefunded() == false)) {
				return new ResponseEntity<>("Nah! You have already bought it", HttpStatus.EXPECTATION_FAILED);
			}
			GemEntity gemEntity = gemService.getOrCreateGemByUserId(user.getUserId());
			int price = postService.getPostById(lessonId).getPrice();
			int gem = gemEntity.getCurrent();
			if (gem < price) {
				return new ResponseEntity<>("Nah! You do not enough gem", HttpStatus.EXPECTATION_FAILED);
			}
			// Xu li buy lesson sau khi qua dc cac dieu kien tren. 
			// Neu mua roi da refund va mua nua thi gan is Refund la false
			Boolean isRefund = null;
			if (userBuy != null && userBuy.getIsRefunded() != null && userBuy.getIsRefunded() == true) {
				isRefund = false;
			}
			UserPostEntity userPost = new UserPostEntity();
			if (userBuy != null)
				userPost = userBuy;
			userPost.setUser(user);
			userPost.setPost(postService.getPostById(lessonId));
			userPost.setIsPass(false);
			userPost.setIsRefunded(isRefund);
			userPost.setCreatedAt(Timestamp.from(Instant.now()));
			userPostService.createUserPost(userPost);
			// update gem
			gemEntity.setCurrent(gemEntity.getCurrent() - price);
			gemEntity.setSpent(gemEntity.getSpent() + price);
			gemRepository.save(gemEntity);
			// update to UserAchieve
			int newSpent = gemEntity.getSpent();
			int score1 = achiService.findScore(7);
			int score2 = achiService.findScore(8);
			int score3 = achiService.findScore(9);
			if (newSpent < score1) {
				userAchiService.updateOrCreateUserAchievement(false, (score1 - newSpent) * 100 / score1, 7, user);
			} else if (newSpent >= score1 && newSpent < score2) {
				userAchiService.updateOrCreateUserAchievement(true, 100, 7, user);
				userAchiService.updateOrCreateUserAchievement(false, (score2 - newSpent) * 100 / score2, 8, user);
			} else if (newSpent >= score2 && newSpent < score3) {
				userAchiService.updateOrCreateUserAchievement(true, 100, 7, user);
				userAchiService.updateOrCreateUserAchievement(true, 100, 8, user);
				userAchiService.updateOrCreateUserAchievement(false, (score3 - newSpent) * 100 / score3, 9, user);
			} else {
				userAchiService.updateOrCreateUserAchievement(true, 100, 7, user);
				userAchiService.updateOrCreateUserAchievement(true, 100, 8, user);
				userAchiService.updateOrCreateUserAchievement(true, 100, 9, user);
			}

			return new ResponseEntity<>("Yah! You got it", HttpStatus.OK);

		} catch (NotFoundException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to buy", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/buy-gem")
	public ResponseEntity<String> buyGem(HttpServletRequest request, @RequestBody int gem) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity user = userService.getUserByEmail(useEmail);
			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
			}
			GemEntity gemEntity = gemService.getOrCreateGemByUserId(user.getUserId());
			int currentGem = gemEntity.getCurrent() + gem;
			gemEntity.setCurrent(currentGem);
			gemRepository.save(gemEntity);

			return new ResponseEntity<>("Yah! You have " + currentGem + " gem", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Failed to buy", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/refund-lesson/{lessonId}")
	public ResponseEntity<String> refundLesson(HttpServletRequest request, @PathVariable int lessonId) {
		try {
			String useEmail = HttpRequestService.getUserEmail(request);
			UserEntity user = userService.getUserByEmail(useEmail);
			if (user == null)
				return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
			UserPostEntity userBuy = userPostService.UserPayPost(user.getUserId(), lessonId);
			if (userBuy == null)
				return new ResponseEntity<>("You have not bought it yet", HttpStatus.UNAUTHORIZED);
			// Ko cho refund lai course da refund
			if (userBuy != null && userBuy.getIsRefunded() != null && userBuy.getIsRefunded() == false)
				return new ResponseEntity<>("You have been refunded once", HttpStatus.SERVICE_UNAVAILABLE);
			Timestamp buyDay = userBuy.getCreatedAt();
			Instant before30days = Instant.now().minus(30, ChronoUnit.DAYS);
			if (buyDay.toInstant().isBefore(before30days))
				return new ResponseEntity<>("You have been buy more than 30 days", HttpStatus.SERVICE_UNAVAILABLE);
			// xu li refund sau khi qua dc cac dieu kien tren
			int price = postService.getPostById(lessonId).getPrice();
			userBuy.setIsRefunded(true);
			userPostService.createUserPost(userBuy);
			// update gem
			GemEntity gemEntity = gemService.getOrCreateGemByUserId(user.getUserId());
			gemEntity.setCurrent(gemEntity.getCurrent() + price);
			gemEntity.setSpent(gemEntity.getSpent() - price);
			gemRepository.save(gemEntity);
			// update to UserAchieve
			int newSpent = gemEntity.getSpent();
			int score1 = achiService.findScore(7);
			int score2 = achiService.findScore(8);
			int score3 = achiService.findScore(9);
			if (newSpent < score1) {
				userAchiService.updateOrCreateUserAchievement(false, (score1 - newSpent) * 100 / score1, 7, user);
			} else if (newSpent >= score1 && newSpent < score2) {
				userAchiService.updateOrCreateUserAchievement(true, 100, 7, user);
				userAchiService.updateOrCreateUserAchievement(false, (score2 - newSpent) * 100 / score2, 8, user);
			} else if (newSpent >= score2 && newSpent < score3) {
				userAchiService.updateOrCreateUserAchievement(true, 100, 7, user);
				userAchiService.updateOrCreateUserAchievement(true, 100, 8, user);
				userAchiService.updateOrCreateUserAchievement(false, (score3 - newSpent) * 100 / score3, 9, user);
			} else {
				userAchiService.updateOrCreateUserAchievement(true, 100, 7, user);
				userAchiService.updateOrCreateUserAchievement(true, 100, 8, user);
				userAchiService.updateOrCreateUserAchievement(true, 100, 9, user);
			}
			return new ResponseEntity<>("Yah! You got the refund", HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to refund, server error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
