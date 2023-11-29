package com.example.demo.thanh.service;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.http.HttpServletRequest;

public class HttpRequestService {
	public static String getUserEmail(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = "";
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            userEmail = (String) principal;
        } else {
            System.out.println("User is not authenticated");
        }

        return userEmail;
    }
	public static boolean hasRole(HttpServletRequest request, String role) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		if (hasRole(authorities, role)) {
			return true;
		} else
		return false;
	}
	private static boolean hasRole(Collection<? extends GrantedAuthority> authorities, String role) {
        return authorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals(role));
    }

}
