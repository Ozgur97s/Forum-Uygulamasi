package com.project.forumapp.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.forumapp.entities.Comment;
import com.project.forumapp.entities.Post;
import com.project.forumapp.entities.User;
import com.project.forumapp.repos.CommentRepository;
import com.project.forumapp.requests.CommentCreateRequest;
import com.project.forumapp.requests.CommentUpdateRequest;

@Service
public class CommentService {

	private CommentRepository commentRepository;
	private UserService userService;
	private PostService postService;

	public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
		this.commentRepository = commentRepository;
		this.userService = userService;
		this.postService = postService;
	}

	public List<Comment> getAllCommentWithParam(Optional<Long> userId, Optional<Long> postId) {

		if (userId.isPresent() && postId.isPresent()) {

			return commentRepository.findByUserIdAndPostId(userId.get(), postId.get());

		} else if (userId.isPresent()) {

			return commentRepository.findByUserId(userId.get());

		} else if (postId.isPresent()) {

			return commentRepository.findByPostId(postId.get());

		} else {
			return commentRepository.findAll();
		}
	}

	public Comment getOneCommentById(Long commentId) {
		return commentRepository.findById(commentId).orElse(null);
	}

	public Comment createOneComment(CommentCreateRequest request) {

		User user = userService.getOneUserById(request.getUserId());
		Post post = postService.getOnePostById(request.getPostId());
		if (user != null && post != null) {
			Comment commentToSave = new Comment();
			commentToSave.setId(request.getId());
			commentToSave.setPost(post);
			commentToSave.setUser(user);
			commentToSave.setText(request.getText());
			commentToSave.setCreateDate(new Date());
			return commentRepository.save(commentToSave);
		} else {
			return null;

		}
	}

	public Comment updateOneCommentById(Long commentId, CommentUpdateRequest request) {
		
		Optional<Comment> comment = commentRepository.findById(commentId);
		if (comment.isPresent()) {
			Comment commentToUpdate = comment.get();
			commentToUpdate.setText(request.getText());
			return commentRepository.save(commentToUpdate);
		}else {
			return null;	
		}
	}

	public void deleteOneCommentById(Long commentId) {
		commentRepository.deleteById(commentId);
	}

	

}
