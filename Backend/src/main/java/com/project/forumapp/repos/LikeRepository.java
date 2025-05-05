package com.project.forumapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.forumapp.entities.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

	List<Like> findByUserIdAndPostId(Long userId, Long postId);

	List<Like> findByPostId(Long userId);

	List<Like> findByUserId(Long postId);
	
	

}
