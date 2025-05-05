package com.project.forumapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.forumapp.entities.Like;
import com.project.forumapp.requests.LikeCreateRequest;
import com.project.forumapp.requests.UpdateLikeRequest;
import com.project.forumapp.services.LikeService;

public class LikeController {
	private LikeService likeService;

	public LikeController(LikeService likeService) {
		this.likeService = likeService;
	}

	@GetMapping
	public List<Like> getAllLikes(@RequestParam Optional<Long> userId, @RequestParam Optional<Long> postId) {

		return likeService.getAllLikesWithParam(userId, postId);
	}

	@GetMapping("{likeId}")
	public Like getOneLike(@PathVariable Long likeId) {
		return likeService.getOneLikeById(likeId);
	}

	@PostMapping
	public Like createOneLike(@RequestBody LikeCreateRequest request) {

		return likeService.createOneLike(request);

	}
	
	
	
	@PutMapping("{likeId}")
	public Like updateOneLike(@PathVariable Long likeId, @RequestBody UpdateLikeRequest request) {
		return likeService.updateOneLikeById(likeId, request);
	}
	
	@DeleteMapping("{likeId}")
	public void deleteOneLike(@PathVariable Long likeId) {
		likeService.deleteById(likeId);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
