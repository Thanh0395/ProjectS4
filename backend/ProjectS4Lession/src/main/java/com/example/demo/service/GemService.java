package com.example.demo.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.GemEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.GemRepository;

@Service
public class GemService {

	@Autowired
	private GemRepository gemRepository;
	
	//Thanh
	@Transactional
    public GemEntity getOrCreateGemByUserId(int userId) {
        
		List<GemEntity> gemEntities = gemRepository.findByUserUserId(userId);
		GemEntity gemEntity;
		if (gemEntities.isEmpty()) {
			gemEntity = new GemEntity();
            gemEntity.setCurrent(0);
            gemEntity.setEarned(0);
            gemEntity.setSpent(0);

            // Set the user for the new gem
            UserEntity user = new UserEntity();
            user.setUserId(userId);
            gemEntity.setUser(user);

            // Save the new gem
            gemEntity = gemRepository.save(gemEntity);
		} else {
			gemEntity = gemEntities.get(0);
		}
        return gemEntity;
    }
	
	public GemEntity saveGemUser(GemEntity gemEntity) {
		return gemRepository.save(gemEntity);
	}
}
