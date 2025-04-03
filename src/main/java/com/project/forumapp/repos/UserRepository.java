package com.project.forumapp.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.forumapp.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
		
	
}
