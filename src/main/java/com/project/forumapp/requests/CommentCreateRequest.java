package com.project.forumapp.requests;

import lombok.Data;

@Data
public class CommentCreateRequest {

	Long id;
	Long userId;
	Long postId;
	String text;
	
}
