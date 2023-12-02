package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmailEntity {

	private String toEmail;
    private String subject;
    private String content;
    private String deevLink;
    private String action;
}
