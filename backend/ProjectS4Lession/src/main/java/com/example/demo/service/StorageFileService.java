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
import com.example.demo.repository.FileRepository;

@Service
public class StorageFileService {

	@Autowired
	private FileRepository fileRepository;
	
	private final Path rootLocation;

	public StorageFileService(StorageFileProperties storageProperties) {
		this.rootLocation = Paths.get(storageProperties.getLocation());
	}

	public void init() {
        try {
            // Create multiple directories by chaining the createDirectories method
            Files.createDirectories(rootLocation.resolve("images/user"));
            Files.createDirectories(rootLocation.resolve("images/post"));
            Files.createDirectories(rootLocation.resolve("video/post"));

            // You can add more directories as needed

            System.out.print(rootLocation.toString());
            System.out.println("Creating directory: " + rootLocation.resolve("images/user").toString());
        } catch (IOException e) {
            // Log or handle the specific error
            e.printStackTrace();
            throw new RuntimeException("Failed to create directories: " + e.getMessage(), e);
        }
    }

	public String getUniqueFileName(MultipartFile file, String folderName) {
		String ext = FilenameUtils.getExtension(file.getOriginalFilename());
		String uniqueId = UUID.randomUUID().toString().replace("-", "");
		return "/" + folderName + "_" + uniqueId + "." + ext;
	}

	public String uploadImageToFileSystem(MultipartFile file, String folderName, String pathCustom) throws IOException {
		String fileName = getUniqueFileName(file,folderName);
		String filePath = rootLocation.resolve(pathCustom + fileName).toString();

		// Create the directory if it doesn't exist
		File directory = new File(rootLocation.toString() + "/" + pathCustom);
		if (!directory.exists()) {
			directory.mkdirs(); // Create the directory and any missing parent directories
		}

		// Save the file using NIO (Java 7+)
		Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);

		FileEntity fileEntity = fileRepository.save(FileEntity.builder().name(file.getOriginalFilename())
				.type(file.getContentType()).filePath(filePath).build());

		if (fileEntity != null) {
			return "File uploaded successfully: " + filePath;
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
				// Handle IOException (e.g., log the error or re-throw it)
				throw e;
			}
		} else {
			// Handle the case where the file is not found (e.g., return null or throw an
			// exception)
			throw new FileNotFoundException("File not found: " + fileName);
		}
	}
	
	@Transactional
	public byte[] downloadImageFromFileSystemToFilePath(String filePath) throws IOException {
		Optional<FileEntity> fileDataOptional = fileRepository.findByFilePath(filePath);
		if (fileDataOptional.isPresent()) {
			Path filePathRoot = Paths.get(filePath);

			try (InputStream inputStream = Files.newInputStream(filePathRoot)) {
				return IOUtils.toByteArray(inputStream); // Using Apache Commons IO
			} catch (IOException e) {
				// Handle IOException (e.g., log the error or re-throw it)
				throw e;
			}
		} else {
			// Handle the case where the file is not found (e.g., return null or throw an
			// exception)
			throw new FileNotFoundException("File not found: " +  fileDataOptional.get().getName().toString());
		}
	}
//
//	public VideoModel uploadVideotoSystem(String path, MultipartFile file) throws IOException {
//		VideoModel videoModel = new VideoModel();
//		String fileName = file.getOriginalFilename();
//		String uuid = UUID.randomUUID().toString();
//		String finalName = uuid.concat(fileName).substring(fileName.indexOf("."));
//
//		// file full path
//		String filePath = path + File.separator + finalName;
//		// create directory to store file
//		File f = new File(path);
//		if (!f.exists()) {
//			f.mkdir();
//		}
//		Files.copy(file.getInputStream(), Paths.get(filePath));
//		videoModel.setVideoName(finalName);
//		return videoModel;
//	}
//	
//	public InputStream getVideoFile(String path, String fileName, int id) throws FileNotFoundException{
//		String fullPath = path + File.separator + fileName;
//		InputStream inputStream = new FileInputStream(fullPath);
//		return inputStream;
//	}
}
