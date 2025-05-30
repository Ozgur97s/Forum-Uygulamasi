package com.project.forumapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.project.forumapp.entities.Like;
import com.project.forumapp.requests.LikeCreateRequest;
import com.project.forumapp.requests.UpdateLikeRequest;
import com.project.forumapp.responses.LikeResponse;
import com.project.forumapp.services.LikeService;

@RestController
@RequestMapping("/likes") // 🔧 eksikti, eklendi
public class LikeController {

	private LikeService likeService;

	public LikeController(LikeService likeService) {
		this.likeService = likeService;
	}

	@GetMapping
	public List<LikeResponse> getAllLikes(@RequestParam Optional<Long> userId,
										  @RequestParam Optional<Long> postId) {
		return likeService.getAllLikesWithParam(userId, postId);
	}

	@GetMapping("/{likeId}")
	public Like getOneLike(@PathVariable Long likeId) {
		return likeService.getOneLikeById(likeId);
	}

	@PostMapping
	public Like createOneLike(@RequestBody LikeCreateRequest request) {
		return likeService.createOneLike(request);
	}

	@PutMapping("/{likeId}")
	public Like updateOneLike(@PathVariable Long likeId, @RequestBody UpdateLikeRequest request) {
		return likeService.updateOneLikeById(likeId, request);
	}

	@DeleteMapping("/{likeId}")
	public void deleteOneLike(@PathVariable Long likeId) {
		likeService.deleteById(likeId);
	}
}
