package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TagPostEntity;


@Repository
public interface TagPostRepository extends JpaRepository<TagPostEntity, Integer> {
	List<TagPostEntity> findByPostPostId(int postId);
	//Thanh
	@Query("SELECT tp FROM TagPostEntity tp WHERE tp.post.postId = :postId AND tp.tag.tagId = :tagId")
    List<TagPostEntity> findByPostIdAndTagId(@Param("postId") int postId, @Param("tagId") int tagId);
	
	@Query("SELECT tp FROM TagPostEntity tp WHERE tp.post.postId = :postId")
	List<TagPostEntity> findByPostId(@Param("postId") int postId);
	
	List<TagPostEntity> findByTagTagId(int tagId);
}
