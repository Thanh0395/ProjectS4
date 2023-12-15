package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.FAQEntity;
import com.example.demo.repository.FAQRepository;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/faq")
public class FaqController {
	@Autowired
	FAQRepository faqRepo;
	
	@GetMapping("/list")
	public ResponseEntity<List<FAQEntity>> getListFaq() {
		try {
			List<FAQEntity> listFaq = faqRepo.findAll();		
			return new ResponseEntity<>(listFaq, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
