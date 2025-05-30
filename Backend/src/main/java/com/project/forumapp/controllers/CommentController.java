package com.project.forumapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.project.forumapp.entities.Comment;
import com.project.forumapp.requests.CommentCreateRequest;
import com.project.forumapp.requests.CommentUpdateRequest;
import com.project.forumapp.services.CommentService;

// 🔧 EKLENMESİ GEREKENLER:
@RestController
@RequestMapping("/comments") // Artık "/comments" endpoint'i çalışacak
public class CommentController {

	private CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}

	@GetMapping
	public List<Comment> getAllComments(@RequestParam Optional<Long> userId, @RequestParam Optional<Long> postId) {
		return commentService.getAllCommentWithParam(userId, postId);
	}

	@GetMapping("/{commentId}")
	public Comment getOneComment(@PathVariable Long commentId) {
		return commentService.getOneCommentById(commentId);
	}

	@PostMapping
	public Comment createOneComment(@RequestBody CommentCreateRequest request) {
		return commentService.createOneComment(request);
	}

	@PutMapping("/{commentId}")
	public Comment updateOneComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest request) {
		return commentService.updateOneCommentById(commentId, request);
	}

	@DeleteMapping("/{commentId}")
	public void deleteOneComment(@PathVariable Long commentId) {
		commentService.deleteOneCommentById(commentId);
	}
}
