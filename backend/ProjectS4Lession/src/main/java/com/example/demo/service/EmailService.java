package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import com.example.demo.entity.EmailEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.UserRepository;

import jakarta.mail.internet.MimeMessage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Component
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepository userRepository;
    @Value("${spring.mail.username}")
    private String fromEmail;

    private String loadEmailTemplate() throws IOException {
        // Load the email template from resources
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new ClassPathResource("templates/EmailTemplate.html").getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder template = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                template.append(line);
            }
            return template.toString();
        }
    }
    
    private String loadEmailTemplateForgotPassword() throws IOException {
        // Load the email template from resources
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new ClassPathResource("templates/EmailTemplateForgotPassword.html").getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder template = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                template.append(line);
            }
            return template.toString();
        }
    }

    public boolean sendMailVerifyCode(EmailEntity email, String code) throws NotFoundException {
        try {
        	Optional<UserEntity> user = userRepository.findByEmail(email.getToEmail());
        	if(!user.isPresent()) {
        		throw new NotFoundException("Not found user with email :" + email.getToEmail());
        	}
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            helper.setFrom(fromEmail); // Set your email here
            helper.setTo(email.getToEmail());
            helper.setSubject(email.getSubject());

            // Load and customize the email template
            String template = loadEmailTemplate();
            template = template.replace("${userName}", user.get().getName());
            template = template.replace("${verifyCodeEmail}", code);
            helper.setText(template, true); // true indicates the content is HTML

            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean sendMailForgotPassword(EmailEntity email, String newPassword) throws NotFoundException {
        try {
        	Optional<UserEntity> user = userRepository.findByEmail(email.getToEmail());
        	if(!user.isPresent()) {
        		throw new NotFoundException("Not found user with email :" + email.getToEmail());
        	}
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            helper.setFrom(fromEmail); // Set your email here
            helper.setTo(email.getToEmail());
            helper.setSubject(email.getSubject());

            // Load and customize the email template
            String template = loadEmailTemplateForgotPassword();
            template = template.replace("${userName}", user.get().getName());
            template = template.replace("${newPassword}", newPassword);
            helper.setText(template, true); // true indicates the content is HTML

            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

