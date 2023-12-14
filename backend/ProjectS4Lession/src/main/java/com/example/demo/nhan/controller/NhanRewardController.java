package com.example.demo.nhan.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.RewardEntity;
import com.example.demo.nhan.dto.NhanRewardDTO;
import com.example.demo.service.RewardService;
import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/nhan/rewards")
public class NhanRewardController {

	@Autowired
	private RewardService rewardService;

	@GetMapping("/list")
	public ResponseEntity<List<NhanRewardDTO>> getAllRewards() {
		List<NhanRewardDTO> rewards = rewardService.getAllRewards();
		return ResponseEntity.ok(rewards);
	}

	@PutMapping("/update/{rewardId}")
	public ResponseEntity<?> updateRewardBadge(@PathVariable int rewardId, @RequestParam("file") MultipartFile file) {
		try {
			NhanRewardDTO updatedReward = rewardService.updateRewardBadge(rewardId, file);
			if (updatedReward != null) {
				return ResponseEntity.ok(updatedReward);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reward not found with ID: " + rewardId);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating badge: " + e.getMessage());
		}
	}

	@DeleteMapping("delete/{rewardId}")
	public ResponseEntity<?> deleteReward (@PathVariable int rewardId) {
		boolean isDeleted = rewardService.deleteReward(rewardId);
		if (isDeleted) {
			return ResponseEntity.ok().build();
		} else {
			return ((BodyBuilder) ResponseEntity.notFound()).body("Reward not found with ID: " + rewardId);
		}
	}
	
	 @PostMapping("/create")
	    public ResponseEntity<?> createReward(@RequestParam("title") String title,
	                                          @RequestParam("badge") MultipartFile badge) {
	        try {
	            NhanRewardDTO rewardDTO = new NhanRewardDTO();
	            rewardDTO.setTitle(title);  
	            NhanRewardDTO createdReward = rewardService.createReward(rewardDTO, badge);
	            if (createdReward != null) {
	                return ResponseEntity.status(HttpStatus.CREATED).body(createdReward);
	            } else {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid reward data");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("Error creating reward: " + e.getMessage());
	        }
	    }

}
