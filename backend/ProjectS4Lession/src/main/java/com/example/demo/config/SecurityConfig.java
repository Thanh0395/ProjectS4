package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthentiFilterConfig jwtAuthentiFilterConfig;
	private final AuthenticationProvider authenticationProvider;
	
	@Bean
	@Order(1)
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers("/api/project4/auth/login").permitAll()
            .requestMatchers("/api/project4/users/**").hasAuthority("ROLE_USER")
            .anyRequest().authenticated()
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthentiFilterConfig, UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
    }
	
//	 @Bean
//	    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//	        httpSecurity.csrf().disable()
//	            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//	            .and()
//	            .authorizeRequests()
//	                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//	                .requestMatchers("/api/project4/auth/login").permitAll()
//	                .requestMatchers("/api/project4/users/**").hasAuthority("ROLE_USER")
//	                .anyRequest().authenticated()
//	            .and()
//	            .authenticationProvider(authenticationProvider)
//	            .addFilterBefore(jwtAuthentiFilterConfig, UsernamePasswordAuthenticationFilter.class);
//
//	        return httpSecurity.build();
//	    }

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//		httpSecurity.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//				.authorizeRequests()
//					.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//				.requestMatchers("/api/project4/auth/login").permitAll()
//				.requestMatchers("/api/project4/users/**").hasAnyAuthority("ROLE_USER")
//				.and()
//				.csrf().disable()
//				.authorizeRequests()
//				.anyRequest()
//				.authenticated()
//				.and()
//				.authenticationProvider(authenticationProvider)
//				.addFilterBefore(jwtAuthentiFilterConfig, UsernamePasswordAuthenticationFilter.class);
//
//		return httpSecurity.build();
//	}

}
