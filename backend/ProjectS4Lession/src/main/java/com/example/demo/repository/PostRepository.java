package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;


@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer>{

	List<PostEntity> findByType(String type);
	//Thanh
	List<PostEntity> findByTypeAndDeletedAtIsNull(String type);
	
	@Query("SELECT p FROM PostEntity p " +
	           "WHERE p.user.userId = :userId " +
	           "AND p.type = :type " +
	           "AND p.deletedAt IS NULL")
	    List<PostEntity> findPostsByUserIdAndTypeAndDeleteIsNull(@Param("userId") int userId,
	                                                             @Param("type") String type);
	
	List<PostEntity> findFirst5ByTypeAndCategoryOrderByCreatedAtDesc(String type, CategoryEntity category);
}
