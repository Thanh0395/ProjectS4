package com.example.demo.nhan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.AchievementEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.nhan.dto.AchievementCreateDto;
import com.example.demo.nhan.dto.NhanAchievementDto;
import com.example.demo.repository.AchievementRepository;
import com.example.demo.service.AchievementService;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.List;


@RestController
@RequestMapping(DEV_DOMAIN_API + "/nhan/achievements")
public class NhanAchievementController {

    @Autowired
    private AchievementService achievementService;


    
    @GetMapping("/list")
    public ResponseEntity<List<NhanAchievementDto>> getAllAchievements() {
        List<NhanAchievementDto> achievements = achievementService.getAllAchievements();
        return ResponseEntity.ok(achievements);
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateAchievement(@RequestBody NhanAchievementDto achievementDetails) {
    	AchievementEntity achievementEntityUpdated = achievementService.saveAchievement(achievementDetails);
    	return new ResponseEntity<>("update ok", HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{achievementId}")
    public ResponseEntity<?> deleteAchievement(@PathVariable int achievementId) {
        try {
            achievementService.deleteAchievement(achievementId);
            return new ResponseEntity<>("Achievement deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting achievement", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createAchievement(@RequestBody AchievementCreateDto achievementCreateDto) {
        try {
            AchievementEntity achievement = achievementService.createAchievement(achievementCreateDto);
            return new ResponseEntity<>(achievement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating achievement: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}