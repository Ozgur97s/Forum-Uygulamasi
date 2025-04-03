package com.project.forumapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.forumapp.entities.Like;
import com.project.forumapp.entities.Post;
import com.project.forumapp.entities.User;
import com.project.forumapp.repos.LikeRepository;
import com.project.forumapp.requests.LikeCreateRequest;
import com.project.forumapp.requests.UpdateLikeRequest;

@Service
public class LikeService {

	LikeRepository likeRepository;
	UserService userService;
	PostService postService;

	public LikeService(LikeRepository likeRepository, UserService userService, PostService postService) {
		this.likeRepository = likeRepository;
		this.userService = userService;
		this.postService = postService;
	}


	public List<Like> getAllLikesWithParam(Optional<Long> userId, Optional<Long> postId) {
		if (userId.isPresent() && postId.isPresent()) {
			return likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
		} else if (userId.isPresent()) {
			return likeRepository.findByUserId(userId.get());
		} else if (postId.isPresent()) {
			return likeRepository.findByPostId(postId.get());
		} else {
			return likeRepository.findAll();
		}
	}

	public Like getOneLikeById(Long likeId) {
		
		return likeRepository.findById(likeId).orElse(null);
	}

	public Like createOneLike(LikeCreateRequest request) {
		
		User user = userService.getOneUserById(request.getUserId());
		Post post = postService.getOnePostById(request.getPostId());
		if (user != null && post != null) {
			Like likeToSave = new Like();
			likeToSave.setId(request.getId());
			likeToSave.setPost(post);
			likeToSave.setUser(user);
			return likeRepository.save(likeToSave);
		}
		return null;
	}


	public Like updateOneLikeById(long likeId, UpdateLikeRequest request) {
		Optional<Like> like = likeRepository.findById(likeId);
		if (like.isPresent()) {
			
			Like likeToUpdate = like.get();
			likeToUpdate.setId(request.getId());
			return likeRepository.save(likeToUpdate);
			
		}
		return null;
	}


	public void deleteById(Long likeId) {
		likeRepository.deleteById(likeId);
	}
	
	
	
	
	
	
	
	
	
}
