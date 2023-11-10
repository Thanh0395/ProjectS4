package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import lombok.Data;

@Configuration
public class initializationProperties {
    @Value("${app.initialization.enabled}")
    private boolean initializationEnabled;

    public boolean isInitializationEnabled() {
        return initializationEnabled;
    }
}
