package com.cdac.repository;

import com.cdac.entities.Role;
import com.cdac.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndRole(String email, Role role);
    Optional<User> findByEmail(String email);

}
