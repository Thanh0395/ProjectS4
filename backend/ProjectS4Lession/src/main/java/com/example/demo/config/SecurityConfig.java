package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.example.demo.constans.GlobalStorage.DEV_DOMAIN_API;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthentiFilterConfig jwtAuthentiFilterConfig;
	private final AuthenticationProvider authenticationProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
	    httpSecurity
	        .cors().and()
	        .csrf().disable()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
	        .authorizeRequests()
	            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	            .requestMatchers(DEV_DOMAIN_API + "/auth/login").permitAll()
	            .requestMatchers(DEV_DOMAIN_API + "/users/**").hasAuthority("USER")
	            .anyRequest().permitAll().and()
	        .authenticationProvider(authenticationProvider)
	        .addFilterBefore(jwtAuthentiFilterConfig, UsernamePasswordAuthenticationFilter.class)
	        .logout() // Adding logout configuration
	            .logoutUrl("/logout") // URL to trigger logout
	            .logoutSuccessUrl(DEV_DOMAIN_API + "/auth/login?logout") // Redirect to this URL after successful logout
	            .invalidateHttpSession(true) // Invalidate HTTP session
	            .deleteCookies("JSESSIONID", "your_other_cookie_name"); // Delete cookies upon logout

	    return httpSecurity.build();
	}


}
