package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.TagDto;
import com.example.demo.entity.TagEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.TagRepository;

@Service
public class TagService {

	@Autowired
	private TagRepository tagRepository;
	
	public List<TagEntity> getAllTag(){
		List<TagEntity> tags = tagRepository.findAll();
		return tags;
	}
	
	public TagEntity createTag(TagEntity tag) {
		return tagRepository.save(tag);
	}
	
	public TagEntity getTagById(int id) throws NotFoundException {
	    return tagRepository.findById(id)
	            .orElseThrow(() -> new NotFoundException("Tag not found with id : " + id));
	}
	
	public TagEntity updateTag(TagEntity tag)throws NotFoundException {
		TagEntity postDb = tagRepository.findById(tag.getTagId())
				.orElseThrow(() -> new NotFoundException("Update failed!. Post not found with id :" + tag.getTagId()));
		if(postDb!= null) {
			return tagRepository.save(tag);
		}
		return null;
	}
	
	public boolean deleteTagById(int tagId) throws NotFoundException {
		if(tagRepository.existsById(tagId)) {
			tagRepository.deleteById(tagId);
			return true;
		}else {
			throw new NotFoundException("Not found Post with post id :" + tagId);
		}	
	}
	
	public boolean checkAnyTagExist() {
		return tagRepository.count() > 0;
	}
	//Thanh
	public List<TagEntity> allTagByPostId(int postId){
		 return tagRepository.findAllByPostId(postId);
	}
	public List<TagDto> allTagCount(){
		 return tagRepository.countPostsPerTag();
	}
	
	public List<TagDto> countTypePerTag(){
		 return tagRepository.countTypePerTag();
	}
	
	public boolean checkNameExist(String name) {
		if (tagRepository.findByTagName(name).isEmpty()) return false;
		return true;
	}
}
