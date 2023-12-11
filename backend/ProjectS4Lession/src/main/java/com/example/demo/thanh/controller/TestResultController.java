package com.example.demo.thanh.controller;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.GemEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.entity.QuestionEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserLevelEntity;
import com.example.demo.entity.UserPostEntity;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.service.AchievementService;
import com.example.demo.service.GemService;
import com.example.demo.service.PostService;
import com.example.demo.service.UserAchievementService;
import com.example.demo.service.UserLevelService;
import com.example.demo.service.UserPostService;
import com.example.demo.service.UserService;
import com.example.demo.thanh.dto.AchievementUserDto;
import com.example.demo.thanh.dto.QuestionDto;
import com.example.demo.thanh.dto.TestResultDto;

@RestController
@RequestMapping(DEV_DOMAIN_API + "/thanh/test-result")
public class TestResultController {
	@Autowired
	private UserService userService;

	@Autowired
	private PostService postService;

	@Autowired
	private UserPostService userPostService;
	
	@Autowired
	private AchievementService achiService;
	
	@Autowired
	private UserAchievementService userAchiService;

	@Autowired
	private QuestionRepository questionRepository;

	@Autowired
	private GemService gemService;

	@Autowired
	private UserLevelService levelService;

	@Autowired
	private AchievementService achieveService;

	@PutMapping("/{userId}/{lessonId}")
	public ResponseEntity<TestResultDto> getUserGameData(@RequestBody List<QuestionDto> submission,
			@PathVariable int userId, @PathVariable int lessonId) {
		try {
			UserPostEntity userBuy = userPostService.UserPayPost(userId, lessonId);
			if (userBuy == null)
				return new ResponseEntity<>(HttpStatus.PAYMENT_REQUIRED);
			UserEntity user = userService.getUserById(userId);
			PostEntity post = postService.getPostById(lessonId);
			int prize = post.getPrize();
			TestResultDto result = getScoreAnswer(submission);
			result.setResultMessage("");
			//Neu da passed ==true thi chi cong diem chu ko tang gem hay exp
			if (userBuy.getIsPass() == true) {
				result.setPassed(true);
				result.setResultMessage("You had passed this quiz test. You will not gain Gem, Exp, Achievement");
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
			// Chia cac moc thuong
			int score = result.getScore();
			GemEntity gemdata = gemService.getOrCreateGemByUserId(userId);
			UserLevelEntity levelData = levelService.getOrCreateLevelByUserId(userId);

			if (score == 100) {
				doGainGem(result, gemdata, score, prize, user);
				doGainLevel(result, levelData, 100, user);
			} else if (100 > score && score >= 75) {
				doGainGem(result, gemdata, score, prize, user);
				doGainLevel(result, levelData, 75, user);
			} else if (75 > score && score >= 50) {
				doGainGem(result, gemdata, score, prize, user);
				doGainLevel(result, levelData, 50, user);
			} else {
				doGainGem(result, gemdata, score, prize, user);
				doGainLevel(result, levelData, 0, user);
			}
			List<AchievementUserDto> achievements = achieveService.findAchievementsByUserId(userId);
			result.setPassed(true);
			result.setAchievements(achievements);
			userBuy.setIsPass(true);
			userPostService.createUserPost(userBuy);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public TestResultDto getScoreAnswer(List<QuestionDto> submission) {
		TestResultDto result = new TestResultDto();
		int total = submission.size();
		int correctAnswer = 0;
		for (QuestionDto questionDto : submission) {
			QuestionEntity questionEntity = questionRepository.findById(questionDto.getQuestionId()).orElse(null);
			String answer = questionDto.getAnswer() != null ? questionDto.getAnswer() : "F";
			if (questionEntity != null && answer.equals(questionEntity.getRightAnswer())) {
				correctAnswer++;
			}
			questionDto.setRightAnswer(questionEntity.getRightAnswer());
		}
		result.setTotalAnswer(total);
		result.setCorrectAnswer(correctAnswer);
		result.setScore(100 * correctAnswer / total);
		result.setQuestions(submission);
		return result;
	}

	public void doGainGem(TestResultDto result, GemEntity gemEntity, int score, int prize, UserEntity user) {
		int gainGem = prize*score/100;
		int earnGem = gemEntity.getEarned() + gainGem;
		gemEntity.setCurrent(gemEntity.getCurrent() + gainGem);
		gemEntity.setEarned(earnGem);
		gemService.saveGemUser(gemEntity);
		result.setResultMessage(result.getResultMessage() + "You gain " + gainGem + " Gem.");
		result.setGainGem(gainGem);
		//update vao achieve
		updateAchievement("earned", earnGem, user);
	}

	public void doGainLevel(TestResultDto result, UserLevelEntity levelEntity, int gainExp, UserEntity user) {
		levelEntity.setExp(levelEntity.getExp() + gainExp);
		int oldLv = levelEntity.getLevel();
		int newLv = levelEntity.getExp() / 100;
		if (newLv > oldLv) {
			levelEntity.setLevel(newLv);
			result.setResultMessage(result.getResultMessage() + " Level up to lv:" + newLv + ".");
		} else {
			result.setResultMessage(result.getResultMessage() + " You gain " + gainExp + " exp.");
		}
		result.setOldLevel(oldLv);
		result.setNewLevel(newLv);
		result.setOldExp(levelEntity.getExp());
		result.setNewExp(levelEntity.getExp()+gainExp);
		//Luu database
		levelEntity.setExp(levelEntity.getExp()+gainExp);
		levelEntity.setLevel(newLv);
		levelService.saveLevelUser(levelEntity);
		//update vao achieve
		updateAchievement("expert", result.getNewExp() , user);
	}
	
	public void updateAchievement(String typeAchie, int newValue, UserEntity user) {
		int levelBronze = 0;
		int levelSilver = 0;
		int levelGold = 0;
		if (typeAchie == "spent") {
			levelBronze = 7;
			levelSilver = 8;
			levelGold = 9;
		} else if (typeAchie == "earned") {
			levelBronze = 4;
			levelSilver = 5;
			levelGold = 6;
		} else if (typeAchie == "expert") {
			levelBronze = 1;
			levelSilver = 2;
			levelGold = 3;
		}
		int score1 = achiService.findScore(levelBronze);
		int score2 = achiService.findScore(levelSilver);
		int score3 = achiService.findScore(levelGold);
		if (newValue < score1) {
			userAchiService.updateOrCreateUserAchievement(false, (score1 - newValue) * 100 / score1, levelBronze, user);
		} else if (newValue >= score1 && newValue < score2) {
			userAchiService.updateOrCreateUserAchievement(true, 100, levelBronze, user);
			userAchiService.updateOrCreateUserAchievement(false, (score2 - newValue) * 100 / score2, levelSilver, user);
		} else if (newValue >= score2 && newValue < score3) {
			userAchiService.updateOrCreateUserAchievement(true, 100, levelBronze, user);
			userAchiService.updateOrCreateUserAchievement(true, 100, levelSilver, user);
			userAchiService.updateOrCreateUserAchievement(false, (score3 - newValue) * 100 / score3, levelGold, user);
		} else {
			userAchiService.updateOrCreateUserAchievement(true, 100, levelBronze, user);
			userAchiService.updateOrCreateUserAchievement(true, 100, levelSilver, user);
			userAchiService.updateOrCreateUserAchievement(true, 100, levelGold, user);	
		}
	}
}
