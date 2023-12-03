package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PostEntity;
import com.example.demo.entity.QuestionEntity;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.thanh.dto.QuestionDto;

@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	// Thanh
	@Autowired
	private PostQuestionService postquestionService;

	public List<QuestionEntity> getQuestionsByPostId(int postId) {
		return questionRepository.findByPostQuestionsPostPostId(postId);
	}

	public QuestionEntity createOrUpdatePostQuestion(PostEntity pEntity, QuestionDto qDto) {
		Long qId = qDto.getQuestionId();
		Optional<QuestionEntity> opQu = questionRepository.findById(qId);
		if(!opQu.isEmpty()) {
			QuestionEntity qEntity = opQu.get();
			qEntity.setContent(qDto.getContent());
			qEntity.setAnswerA(qDto.getAnswerA());
			qEntity.setAnswerB(qDto.getAnswerB());
			qEntity.setAnswerC(qDto.getAnswerC());
			qEntity.setAnswerD(qDto.getAnswerD());
			qEntity.setRightAnswer(qDto.getRightAnswer());
			questionRepository.save(qEntity);
			return qEntity;
		} else {
			QuestionEntity qEntity = new QuestionEntity();
			qEntity.setContent(qDto.getContent());
			qEntity.setAnswerA(qDto.getAnswerA());
			qEntity.setAnswerB(qDto.getAnswerB());
			qEntity.setAnswerC(qDto.getAnswerC());
			qEntity.setAnswerD(qDto.getAnswerD());
			qEntity.setRightAnswer(qDto.getRightAnswer());
			questionRepository.save(qEntity);
			// them cho bang phu
			postquestionService.createByPostQuestion(pEntity, qEntity);
			return qEntity;
		}
	}
}
