package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.TagDto;
import com.example.demo.entity.TagEntity;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Integer> {
	// Thanh
    @Query("SELECT tag FROM TagEntity tag " +
           "JOIN tag.tagPosts tagPost " +
           "WHERE tagPost.post.postId = :postId")
    List<TagEntity> findAllByPostId(@Param("postId") int postId);
    
    @Query("SELECT NEW com.example.demo.dto.TagDto(t.tagId, t.tagName, COUNT(tp.post)) " +
            "FROM TagEntity t " +
            "JOIN t.tagPosts tp " +
            "GROUP BY t.tagId, t.tagName " +
            "ORDER BY t.tagId ASC")
     List<TagDto> countPostsPerTag();
    
    @Query("SELECT NEW com.example.demo.dto.TagDto(t.tagId, t.tagName, " +
            "COUNT(CASE WHEN tp.post.type = 'lesson' THEN tp.post END) as lessonCount, " +
            "COUNT(CASE WHEN tp.post.type = 'test' THEN tp.post END) as examCount, " +
            "COUNT(tp.post) as totalCount) " +
            "FROM TagEntity t " +
            "JOIN t.tagPosts tp " +
            "GROUP BY t.tagId, t.tagName " +
            "ORDER BY t.tagId ASC")
    List<TagDto> countTypePerTag();
    
    List<TagEntity> findByTagName(String tagName);
}
