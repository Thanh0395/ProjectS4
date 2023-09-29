package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.FileEntity;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Integer> {

	Optional<FileEntity> findByName(String fileName);
	Optional<FileEntity> findFirstByName(String fileName);
	Optional<FileEntity> findByFilePath(String filePath);
}
