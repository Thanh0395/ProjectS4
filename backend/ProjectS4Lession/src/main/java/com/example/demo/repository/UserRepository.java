package com.example.demo.repository;

import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserEntity;
import com.example.demo.nhan.dto.UserDetailDto;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
	Optional<UserEntity> findByEmail(String email);
	 @Query("SELECT COUNT(p) FROM PostEntity p WHERE p.user.userId = :userId")
	    int countPostsByUserId(@Param("userId") int userId);

	    @Query("SELECT SUM(g.current) FROM GemEntity g WHERE g.user.userId = :userId")
	    Integer  sumGemsByUserId(@Param("userId") int userId);

	    @Query("SELECT COUNT(a) FROM UserAchievementEntity a WHERE a.user.userId = :userId")
	    int countAchievementsByUserId(@Param("userId") int userId);
}
