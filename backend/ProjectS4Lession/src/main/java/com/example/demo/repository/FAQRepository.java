package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.FAQEntity;


@Repository
public interface FAQRepository extends JpaRepository<FAQEntity, Integer> {

}
