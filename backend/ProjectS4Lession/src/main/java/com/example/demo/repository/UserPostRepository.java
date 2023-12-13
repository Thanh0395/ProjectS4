package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserPostEntity;


@Repository
public interface UserPostRepository extends JpaRepository<UserPostEntity, Integer> {
	//Thanh
	@Query("SELECT up FROM UserPostEntity up " +
	           "WHERE up.user.userId = :userId " +
	           "AND up.post.postId = :postId " +
	           "AND (up.isRefunded = false OR up.isRefunded IS NULL)")
	    List<UserPostEntity> findByUserIdAndPostIdAndNotRefunded(@Param("userId") int userId, @Param("postId") int postId);
	
	@Query("SELECT DISTINCT up.post FROM UserPostEntity up " +
	        "WHERE up.user.userId = :userId " +
	        "AND up.post.type = 'lesson' " +
	        "AND (up.isRefunded = false OR up.isRefunded IS NULL)")
    List<PostEntity> findLesonsBoughtUserId(@Param("userId") int userId);
}
