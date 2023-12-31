package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import com.example.demo.exception.EmptyFileException;
import com.example.demo.service.StorageService;


@RestController
@RequestMapping(DEV_DOMAIN_API + "/file")
public class StorageFileController {

	@Autowired
	private StorageService storageFileService;
	
	@PostMapping("/upload-image")
	public ResponseEntity<?> uploadImageToFileSystem(@RequestParam("file") MultipartFile file, String folderName, String folderPath) 
			throws IOException, EmptyFileException
	{
		String uploadImage = storageFileService.uploadImageToFileSystem(file, folderName, folderPath);
		return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
	}
	
	@GetMapping("/download/{fileName}")
	public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
	    byte[] imageData = storageFileService.downloadImageFromFileSystem(fileName);
	    String fileExtension = getFileExtension(fileName);
	    MediaType mediaType = MediaType.IMAGE_PNG;
	    if (fileExtension != null) {
	        switch (fileExtension.toLowerCase()) {
	            case "jpg":
	            case "jpeg":
	                mediaType = MediaType.IMAGE_JPEG;
	                break;
	            case "png":
	                mediaType = MediaType.IMAGE_PNG;
	                break;
	            case "gif":
	                mediaType = MediaType.IMAGE_GIF;
	                break;
	            default:
	                mediaType = MediaType.APPLICATION_OCTET_STREAM;
	                break;
	        }
	    }

	    return ResponseEntity.status(HttpStatus.OK)
	            .contentType(mediaType)
	            .body(imageData);
	}

	private String getFileExtension(String fileName) {
	    int lastDotIndex = fileName.lastIndexOf('.');
	    if (lastDotIndex > 0) {
	        return fileName.substring(lastDotIndex + 1);
	    }
	    return null;
	}
	
	@PostMapping("/upload-video")
	public ResponseEntity<?> uploadVideoToFileSystem(@RequestParam("file") MultipartFile file, String folderName, String folderPath) throws IOException{
		String uploadImage = storageFileService.uploadVideotoSystem(file, folderName, folderPath);
		return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
	}

}
