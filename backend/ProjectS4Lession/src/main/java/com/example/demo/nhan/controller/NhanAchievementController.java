package com.example.demo.nhan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.nhan.dto.NhanAchievementDto;
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
    
    
}