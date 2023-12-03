package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PostEntity;
import com.example.demo.entity.TagEntity;
import com.example.demo.entity.TagPostEntity;
import com.example.demo.repository.TagPostRepository;

@Service
public class TagPostService {

	@Autowired
	private TagPostRepository tagPostRepository;

	// thanh
	public boolean addTagPost(PostEntity post, TagEntity tag) {
		try {
			TagPostEntity tagpost = new TagPostEntity();
			tagpost.setPost(post);
			tagpost.setTag(tag);
			tagPostRepository.save(tagpost);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean removeTagPost(int pId, int tId) {
		try {
			List<TagPostEntity> tagpost = tagPostRepository.findByPostIdAndTagId(pId, tId);
			if (tagpost.isEmpty())
				return false;
			else {
				tagPostRepository.delete(tagpost.get(0));
				return true;
			}
		} catch (Exception e) {
			return false;
		}
	}

	public boolean removeAllTagsofPost(int pId) {
		List<TagPostEntity> tagposts = findAllTagsofPost(pId);
		if (tagposts == null || tagposts.isEmpty()) {
			return false;
		}
		tagPostRepository.deleteAll(tagposts);
		return true;
	}

	public TagPostEntity findTagPost(int pId, int tId) {
		List<TagPostEntity> tagposts = tagPostRepository.findByPostIdAndTagId(pId, tId);
		if (tagposts.isEmpty())
			return null;
		else
			return tagposts.get(0);
	}

	public List<TagPostEntity> findAllTagsofPost(int pId) {
		List<TagPostEntity> tagposts = tagPostRepository.findByPostId(pId);
		if (tagposts.isEmpty())
			return null;
		else
			return tagposts;
	}
}
