package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.FeedbackEntity;
import com.example.demo.repository.FeedbackRepository;
import com.example.demo.service.FeedbackService;
import com.example.demo.service.UserService;
import com.example.demo.thanh.dto.FeedbackDto;
import com.example.demo.thanh.service.HttpRequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/comment")
public class CommentController {
	@Autowired
	FeedbackRepository feedbackRepo;

	@Autowired
	FeedbackService feedbackService;

	@Autowired
	UserService userService;

	@GetMapping("/dashboard-list")
	public ResponseEntity<List<FeedbackDto>> getListComment(HttpServletRequest request) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				List<FeedbackDto> feedbackDtos = new ArrayList<>();
				List<FeedbackEntity> feedbacks = feedbackRepo.findByOrderByCreatedAtDesc();
				if (feedbacks != null && !feedbacks.isEmpty()) {
					feedbackDtos = feedbacks.stream()
							.map(feedback -> new FeedbackDto(feedback.getFeedbackId(), feedback.getContent(),
									feedback.getUser() != null ? feedback.getUser().getName() : "Anonymous",
									feedback.getUser() != null ? feedback.getUser().getAvatar()
											: "uploads/images/user/User_default.jpg",
									feedback.getStatus() != null ? feedback.getStatus() : "pending",
									feedback.getCreatedAt()))
							.collect(Collectors.toList());
				}
				return new ResponseEntity<>(feedbackDtos, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/change-status/{status}/{feedbackId}")
	public ResponseEntity<FeedbackDto> changeStatusComment(HttpServletRequest request, @PathVariable String status,
			@PathVariable int feedbackId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				FeedbackEntity feedback = feedbackService.getFeedbackById(feedbackId);
				if (feedback == null)
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				// update status
				feedback.setStatus(status);
				feedbackRepo.save(feedback);
				// tra ve Dto
				FeedbackDto feedbackDto = new FeedbackDto(feedback.getFeedbackId(), feedback.getContent(),
						feedback.getUser() != null ? feedback.getUser().getName() : "Anonymous",
						feedback.getUser() != null ? feedback.getUser().getAvatar()
								: "uploads/images/user/User_default.jpg",
						status, feedback.getCreatedAt());
				return new ResponseEntity<>(feedbackDto, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete/{feedbackId}")
	public ResponseEntity<FeedbackDto> deleteComment(HttpServletRequest request, @PathVariable int feedbackId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				FeedbackEntity feedback = feedbackService.getFeedbackById(feedbackId);
				if (feedback == null)
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				feedbackRepo.delete(feedback);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/change-status-list/{status}")
	public ResponseEntity<?> updateStatusListComment(HttpServletRequest request, @PathVariable String status, @RequestBody List<Integer> listId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				for (int i = 0; i < listId.size(); i++) {
					Integer feedbackId = listId.get(i);
					FeedbackEntity feedback = feedbackService.getFeedbackById(feedbackId);
					feedback.setStatus(status);
					feedbackRepo.save(feedback);
				}
				return new ResponseEntity<>("Update status list to " + status + " successfully!", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Do not allow to delete!", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/delete-list")
	public ResponseEntity<?> deleteListComment(HttpServletRequest request, @RequestBody List<Integer> listId) {
		try {
			if (HttpRequestService.hasRole(request, "ADMIN")) {
				for (int i = 0; i < listId.size(); i++) {
					Integer feedbackId = listId.get(i);
					FeedbackEntity feedback = feedbackService.getFeedbackById(feedbackId);
					feedbackRepo.delete(feedback);
				}
				return new ResponseEntity<>("Delete list successfully!", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Do not allow to delete!", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while processing the request" + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
