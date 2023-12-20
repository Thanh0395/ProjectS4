package com.example.demo.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.config.StorageFileProperties;
import com.example.demo.entity.FileEntity;
import com.example.demo.exception.EmptyFileException;
import com.example.demo.repository.FileRepository;

@Service
public class StorageService {

	private final Path rootLocation;
	@Autowired
	private FileRepository fileRepository;

	public StorageService(StorageFileProperties storageProperties) {
		this.rootLocation = Paths.get(storageProperties.getLocation());
	}

	public void init() {
		try {
			Files.createDirectories(rootLocation.resolve("images/user"));
			Files.createDirectories(rootLocation.resolve("images/post"));
			Files.createDirectories(rootLocation.resolve("images/category"));
			Files.createDirectories(rootLocation.resolve("images/reward"));
			Files.createDirectories(rootLocation.resolve("video/post"));
			System.out.print(rootLocation.toString());

		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Failed to create directories: " + e.getMessage(), e);
		}
	}

	public String getUniqueFileName(MultipartFile file, String folderName) {
		String ext = FilenameUtils.getExtension(file.getOriginalFilename());
		String uniqueId = UUID.randomUUID().toString().replace("-", "");
		return "/" + folderName + "_" + uniqueId + "." + ext;
	}

	public String uploadImageToFileSystem(MultipartFile file, String folderName, String pathCustom) 
			throws IOException, EmptyFileException
	{
		if(file.isEmpty()) {
			throw new EmptyFileException("File is empty");
		}
		String fileName = getUniqueFileName(file, folderName);
		String filePath = rootLocation.resolve(pathCustom + fileName).toString();

		// Create the directory if it doesn't exist
		File directory = new File(rootLocation.toString() + "/" + pathCustom);
		if (!directory.exists()) {
			directory.mkdirs(); // Create the directory and any missing parent directories
		}

		// Save the file using NIO (Java 7+)
		Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
		FileEntity fileData = fileRepository.save(FileEntity.builder().name(fileName.substring(1))
				.type(file.getContentType()).filePath(filePath).build());

		if (fileData != null) {
	        String relativePath = filePath.substring(filePath.indexOf("uploads"));
	        return relativePath.replace("\\", "/"); // Replace backslashes with forward slashes for consistency
	    }
		return null;
	}

	@Transactional
	public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
		Optional<FileEntity> fileDataOptional = fileRepository.findFirstByName(fileName);
		if (fileDataOptional.isPresent()) {
			String filePathDb = fileDataOptional.get().getFilePath();
			Path filePath = Paths.get(filePathDb);

			try (InputStream inputStream = Files.newInputStream(filePath)) {
				return IOUtils.toByteArray(inputStream); // Using Apache Commons IO
			} catch (IOException e) {
				throw e;
			}
		} else {
			throw new FileNotFoundException("File not found: " + fileName);
		}
	}

	public String uploadVideotoSystem(MultipartFile file, String folderName, String pathCustom) throws IOException {
		String fileName = getUniqueFileName(file, folderName);
		String filePath = rootLocation.resolve(pathCustom + fileName).toString();
		
		File directory = new File(rootLocation.toString() + "/" + pathCustom);
		if (!directory.exists()) {
			directory.mkdirs();
		}
		Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
		FileEntity fileData = fileRepository.save(FileEntity.builder().name(fileName.substring(1))
				.type(file.getContentType()).filePath(filePath).build());

		if (fileData != null) {
			return fileName.substring(1);
		}
		return null;
	}

}
