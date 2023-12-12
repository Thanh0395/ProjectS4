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
            "(SELECT COALESCE(COUNT(p), 0) FROM t.tagPosts tp JOIN tp.post p WHERE p.type = 'lesson' AND p.deletedAt IS NULL) as lessonCount, " +
            "(SELECT COALESCE(COUNT(p), 0) FROM t.tagPosts tp JOIN tp.post p WHERE p.type = 'test' AND p.deletedAt IS NULL) as examCount, " +
            "(SELECT COALESCE(COUNT(p), 0) FROM t.tagPosts tp JOIN tp.post p WHERE p.deletedAt IS NULL) as totalCount) " +
            "FROM TagEntity t " +
            "ORDER BY t.tagId ASC")
    List<TagDto> countTypePerTag();
    
    List<TagEntity> findByTagName(String tagName);
}
