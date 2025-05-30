package com.project.forumapp.responses;

import java.util.List;

import com.project.forumapp.entities.Like;
import com.project.forumapp.entities.Post;

import lombok.Data;

@Data
public class PostResponse {
	
	Long id;
	Long userId;
	String userName;
	String text;
	String title;
	List<LikeResponse> postLikes;

	
	public PostResponse(Post entity, List<LikeResponse> likes) {
		this.id = entity.getId();
		this.userId= entity.getUser().getId();
		this.userName=entity.getUser().getUserName();
		this.title= entity.getTitle();
		this.text=entity.getText();
		this.postLikes=likes;
		
	}
}
