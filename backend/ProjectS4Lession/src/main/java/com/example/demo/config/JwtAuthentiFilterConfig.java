package com.example.demo.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@RequiredArgsConstructor
public class JwtAuthentiFilterConfig extends OncePerRequestFilter{

	private final String Secret_key = "123";
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authorizationHeader = request.getHeader(AUTHORIZATION);
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String token = authorizationHeader.substring("Bearer ".length());
				Algorithm algorithm = Algorithm.HMAC256(Secret_key.getBytes());
				JWTVerifier jwtVerifier = JWT.require(algorithm).build();
				DecodedJWT decodeJwt = jwtVerifier.verify(token);
				String userName = decodeJwt.getSubject();
				String[] roles = decodeJwt.getClaim("roles").asArray(String.class);
				
				Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
				Arrays.stream(roles).forEach(role -> {
					authorities.add(new SimpleGrantedAuthority(role));
				});
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken 
					= new UsernamePasswordAuthenticationToken(userName, null,authorities);
				
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				
				filterChain.doFilter(request, response);
				
				
			} catch (Exception e) {
				response.setHeader("error", e.getMessage());
				response.setStatus(FORBIDDEN.value());
				Map<String, String> errors = new HashMap<String, String>();
				errors.put("error_message", e.getMessage());
				response.setContentType(APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), errors);
				
			}
		}else {
			filterChain.doFilter(request, response);
			
		}
	}

}
