package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>{
	//Thanh
	@Query("SELECT NEW com.example.demo.dto.CategoryDto(c.categoryId, c.categoryName, " +
			"COUNT(CASE WHEN p.type = 'lesson' THEN 1 ELSE null END) as lessonCount, " +
	        "COUNT(CASE WHEN p.type = 'test' THEN 1 ELSE null END) as examCount, " +
	        "COUNT(p) as totalCount) " +
	        "FROM CategoryEntity c " +
	        "LEFT JOIN c.posts p " +
	        "GROUP BY c.categoryId, c.categoryName " +
	        "ORDER BY c.categoryId ASC")
    List<CategoryDto> countTypePerCategory();
	
	List<CategoryEntity> findByCategoryName(String CategoryName);
}
