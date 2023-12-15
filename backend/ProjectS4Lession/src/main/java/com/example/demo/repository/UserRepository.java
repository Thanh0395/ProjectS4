package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserEntity;
import com.example.demo.nhan.dto.UserDetailDto;
import com.example.demo.thanh.dto.AuthorDto;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	Optional<UserEntity> findByEmail(String email);

	@Query("SELECT COUNT(p) FROM PostEntity p WHERE p.user.userId = :userId")
	int countPostsByUserId(@Param("userId") int userId);

	@Query("SELECT SUM(g.current) FROM GemEntity g WHERE g.user.userId = :userId")
	Integer sumGemsByUserId(@Param("userId") int userId);

	@Query("SELECT COUNT(a) FROM UserAchievementEntity a WHERE a.user.userId = :userId")
	int countAchievementsByUserId(@Param("userId") int userId);
	
	//Thanh
	@Query("SELECT NEW com.example.demo.thanh.dto.AuthorDto(u.userId, u.name, u.email, u.avatar, " +
	        "COUNT(DISTINCT p.postId) AS countLesson, " +
	        "COALESCE(COUNT(DISTINCT up.userPostId), 0) AS soldLesson) " +
	        "FROM PostEntity p " +
	        "JOIN p.user u " +
	        "LEFT JOIN UserPostEntity up ON up.post.postId = p.postId " +
	        "WHERE p.deletedAt IS NULL AND p.type = 'lesson' " +
	        "AND (up.isRefunded = false OR up.isRefunded IS NULL) " +
	        "GROUP BY u.userId, u.name, u.email, u.avatar " +
	        "ORDER BY countLesson DESC")
    List<AuthorDto> countLessonAuthor();
    
}
