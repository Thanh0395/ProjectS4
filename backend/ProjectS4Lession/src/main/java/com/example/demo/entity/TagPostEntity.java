package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tag_post_tbl")
public class TagPostEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tag_post_id")
	private int tagPostId;
		
	@ManyToOne
	@JoinColumn(name = "tag_id", referencedColumnName = "tag_id")
	private TagEntity tag;
	
	@ManyToOne
	@JoinColumn(name = "post_id", referencedColumnName = "post_id")
	private PostEntity post;
}
