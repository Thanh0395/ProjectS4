package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.RewardEntity;
import com.example.demo.nhan.dto.NhanRewardDTO;
import com.example.demo.repository.RewardRepository;

@Service
public class RewardService {

	@Autowired
	private RewardRepository rewardRepository;

	public List<RewardEntity> findAll() {
		return rewardRepository.findAll();
	}

	public List<NhanRewardDTO> getAllRewards() {
		return rewardRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
	}

	private NhanRewardDTO convertEntityToDTO(RewardEntity reward) {
		return new NhanRewardDTO(reward.getRewardId(), reward.getTitle(), reward.getBadge());
	}

	private static final String UPLOAD_DIRECTORY = "src/main/resources/static/uploads/images/reward/";

	public NhanRewardDTO updateRewardBadge(int rewardId, MultipartFile file) throws IOException {
		RewardEntity reward = rewardRepository.findById(rewardId).orElse(null);
		if (reward != null && !file.isEmpty()) {
			String badgeUrl = storeFile(file);
			reward.setBadge(badgeUrl);
			RewardEntity updatedEntity = rewardRepository.save(reward);
			return new NhanRewardDTO(updatedEntity.getRewardId(), updatedEntity.getTitle(), updatedEntity.getBadge());
		}
		return null;
	}

	private String storeFile(MultipartFile file) throws IOException {
		Path uploadPath = Paths.get(UPLOAD_DIRECTORY);
		System.out.println(uploadPath);
		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		String filename = System.currentTimeMillis() + "reward" + file.getOriginalFilename();
		Path filePath = uploadPath.resolve(filename);
		Files.copy(file.getInputStream(), filePath);

		return filename;
	}

	public boolean deleteReward(int rewardId) {
		if (rewardRepository.existsById(rewardId)) {
			rewardRepository.deleteById(rewardId);
			return true;
		}
		return false;
	}

	public NhanRewardDTO createReward(NhanRewardDTO rewardDTO, MultipartFile badgeFile) throws IOException {
		String badgeUrl = null;
		if (badgeFile != null && !badgeFile.isEmpty()) {
			badgeUrl = storeFile(badgeFile);
		}

		RewardEntity reward = new RewardEntity();
		reward.setTitle(rewardDTO.getTitle());
		reward.setBadge(badgeUrl); // Set the badge URL after storing the file

		// Set other fields from rewardDTO if necessary

		RewardEntity savedEntity = rewardRepository.save(reward);
		return new NhanRewardDTO(savedEntity.getRewardId(), savedEntity.getTitle(), savedEntity.getBadge());
	}

}
