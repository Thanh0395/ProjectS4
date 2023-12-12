package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProfileDto.ProfileResponse;
import com.example.demo.dto.ProfileDto.ProfileResponse.User;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ProfileService {

	@Autowired
	private UserService userService;
	@Autowired
	private PostService postService;
	@Autowired
	private PostRepository postRepository;
	
	public ProfileResponse profile(int userId) throws NotFoundException {
        UserEntity userDb = userService.getUserById(userId);
        List<PostEntity> postsDb = postRepository.findByUserUserId(userId);
        ProfileResponse profileResponse = new ProfileResponse();
        
        List<ProfileResponse.Post> posts = postsDb.stream()
                .map(postEntity -> {
                    ProfileResponse.Post post = profileResponse.new Post();
                    post.setPostId(postEntity.getPostId());
                    post.setFeatureImage(postEntity.getFeatureImage());
                    post.setVideo(postEntity.getVideo());
                    post.setPrice(postEntity.getPrice());
                    post.setPrize(postEntity.getPrize());
                    post.setTitle(postEntity.getTitle());
                    post.setContent(postEntity.getContent());
                    post.setType(postEntity.getType());
                    return post;
                })
                .collect(Collectors.toList());

        ProfileResponse.User user = profileResponse.new User();
        user.setUserId(userDb.getUserId());
        user.setUserName(userDb.getName());
        user.setAvatar(userDb.getAvatar());
        user.setEmail(userDb.getEmail());
        
        return ProfileResponse.builder()
                .user(user)
                .posts(posts)
                .build();
    }
	
}
