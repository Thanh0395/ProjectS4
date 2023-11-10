package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.GemEntity;


@Repository
public interface GemRepository extends JpaRepository<GemEntity, Integer> {

}
