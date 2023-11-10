package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.service.StorageService;


@RestController
@RequestMapping("/api/project4/file")
public class StorageFileController {

	@Autowired
	private StorageService storageFileService;
	
	@PostMapping("/upload")
	public ResponseEntity<?> uploadImageToFileSystem(@RequestParam("file") MultipartFile file, String folderName, String folderPath) throws IOException{
		String uploadImage = storageFileService.uploadImageToFileSystem(file, folderName, folderPath);
		return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
	}
	
//	@GetMapping("/download/{fileName}")
//	public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
//		byte[] imageData = storageFileService.downloadImageFromFileSystem(fileName);
//		return ResponseEntity.status(HttpStatus.OK)
//				.contentType(MediaType.valueOf("image/png"))
//				.body(imageData);
//	}
}
