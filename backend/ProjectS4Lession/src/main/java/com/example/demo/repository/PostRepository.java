package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CategoryEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserEntity;


@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer>{

	List<PostEntity> findByType(String type);
	//Thanh
	List<PostEntity> findByTypeAndDeletedAtIsNullOrderByCreatedAtDesc(String type);
	
	@Query("SELECT p FROM PostEntity p " +
	           "WHERE p.user.userId = :userId " +
	           "AND p.type = :type " +
	           "AND p.deletedAt IS NULL " +
		       "ORDER BY p.createdAt DESC")
	    List<PostEntity> findPostsByUserIdAndTypeAndDeleteIsNull(@Param("userId") int userId,
	                                                             @Param("type") String type);
	
	List<PostEntity> findFirst5ByTypeAndCategoryOrderByCreatedAtDesc(String type, CategoryEntity category);

	//Hung
	List<PostEntity> findByUserUserIdAndDeletedAtIsNull(int userId);

	List<PostEntity> findByCategoryCategoryIdAndDeletedAtIsNull(int categoryId);
	
	List<PostEntity> findTop5ByUserAndDeletedAtIsNullOrderByCreatedAtDesc(UserEntity user);
	
	List<PostEntity> findTop5ByDeletedAtIsNullOrderByPrizeDesc();
	
	@Query("SELECT p, COUNT(f) AS feedbackCount " +
	           "FROM PostEntity p " +
	           "LEFT JOIN p.feedbacks f " +
	           "WHERE p.deletedAt IS NULL " +
	           "GROUP BY p " +
	           "ORDER BY feedbackCount DESC")
	List<Object[]> findTop5PostsByFeedbackCount();
	
}
