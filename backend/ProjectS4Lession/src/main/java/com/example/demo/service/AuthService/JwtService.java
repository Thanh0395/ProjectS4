package com.example.demo.service.AuthService;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.entity.UserEntity;

import static com.example.demo.constans.GlobalStorage.SECRET_KEY_JWT;

@Service
public class JwtService {
	
	
	public String generateToken(UserEntity user, Collection<SimpleGrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY_JWT.getBytes());
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + 50 * 60  * 100000))
				.withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
	}
	
	public String generateRefreshToken(UserEntity user, Collection<SimpleGrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY_JWT.getBytes());
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + 70 * 60  * 100000))
				.sign(algorithm);
	}
}
