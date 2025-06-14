package com.project.forumapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.forumapp.entities.Comment;
import com.project.forumapp.entities.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

	List<Like> findByUserIdAndPostId(Long userId, Long postId);

	List<Like> findByPostId(Long userId);

	List<Like> findByUserId(Long postId);
	
	@Query(value = 	"select ' beğendi', l.post_id, u.avatar, u.user_name from "
			+ "p_like l left join user u on u.id = l.user_id "
			+ "where l.post_id in :postIds limit 5", nativeQuery = true)
	List<Object> findUserLikesByPostId(@Param("postIds") List<Long> postIds);

}
