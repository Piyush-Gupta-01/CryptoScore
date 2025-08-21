package com.cryptoscore.repository;

import com.cryptoscore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByWalletAddress(String walletAddress);
    Boolean existsByEmail(String email);
    Boolean existsByWalletAddress(String walletAddress);
}