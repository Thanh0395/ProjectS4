package com.example.demo.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PostEntity;
import com.example.demo.entity.PostQuestionEntity;
import com.example.demo.entity.QuestionEntity;
import com.example.demo.repository.PostQuestionRepository;

@Service
public class PostQuestionService {

	@Autowired
	private PostQuestionRepository postQuestionRepository;
	
	//Thanh
	public PostQuestionEntity createByPostQuestion(PostEntity pEn, QuestionEntity qEn) {
		PostQuestionEntity pqEn = new PostQuestionEntity();
		pqEn.setPost(pEn);
		pqEn.setQuestion(qEn);
		postQuestionRepository.save(pqEn);
		return pqEn;
	}
	
	public String deleteAllPostQuestionByPostId(int postId, Long quesionId){
		List<PostQuestionEntity> list = findAllByPostIdQuestionId(postId, quesionId);
		if(list.isEmpty()) return "Empty";
		else {
			postQuestionRepository.deleteAll(list);
			return "ok";
		}
	}
	
	public List<PostQuestionEntity> findAllByPostIdQuestionId(int postId, Long quesionId){
		return postQuestionRepository.findAllByPost_PostIdAndQuestion_QuestionId(postId, quesionId);
	}
}
