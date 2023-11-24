package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.FileEntity;
import com.example.demo.repository.FileRepository;

@Service
public class FileService {

	@Autowired
	private FileRepository fileRepository;
	
	public boolean checkAnyPostExist() {
		return fileRepository.count() > 0;
	}
	
	public FileEntity createFile(FileEntity fileEntity) {
		return fileRepository.save(fileEntity);
	}
}
