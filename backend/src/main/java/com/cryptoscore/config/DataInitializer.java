package com.cryptoscore.config;

import com.cryptoscore.model.Role;
import com.cryptoscore.model.User;
import com.cryptoscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create demo users if they don't exist
        if (userRepository.count() == 0) {
            createDemoUsers();
        }
    }

    private void createDemoUsers() {
        // Demo user 1
        User user1 = new User();
        user1.setFirstName("John");
        user1.setLastName("Doe");
        user1.setEmail("john.doe@example.com");
        user1.setPassword(passwordEncoder.encode("password123"));
        user1.setCreditScore(780);
        user1.setReputationTokens(2847);
        user1.setKycVerified(true);
        user1.setOnboardingCompleted(true);
        user1.setWalletAddress("0x1234567890123456789012345678901234567890");
        
        Set<Role> roles1 = new HashSet<>();
        roles1.add(Role.USER);
        roles1.add(Role.BORROWER);
        user1.setRoles(roles1);
        
        userRepository.save(user1);

        // Demo user 2
        User user2 = new User();
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setEmail("jane.smith@example.com");
        user2.setPassword(passwordEncoder.encode("password123"));
        user2.setCreditScore(720);
        user2.setReputationTokens(1950);
        user2.setKycVerified(true);
        user2.setOnboardingCompleted(true);
        user2.setWalletAddress("0x0987654321098765432109876543210987654321");
        
        Set<Role> roles2 = new HashSet<>();
        roles2.add(Role.USER);
        roles2.add(Role.BORROWER);
        roles2.add(Role.LENDER);
        user2.setRoles(roles2);
        
        userRepository.save(user2);

        // Demo user 3 - New user
        User user3 = new User();
        user3.setFirstName("Alice");
        user3.setLastName("Johnson");
        user3.setEmail("alice.johnson@example.com");
        user3.setPassword(passwordEncoder.encode("password123"));
        user3.setCreditScore(650);
        user3.setReputationTokens(100);
        user3.setKycVerified(false);
        user3.setOnboardingCompleted(false);
        
        Set<Role> roles3 = new HashSet<>();
        roles3.add(Role.USER);
        roles3.add(Role.BORROWER);
        user3.setRoles(roles3);
        
        userRepository.save(user3);

        System.out.println("Demo users created successfully!");
        System.out.println("Login credentials:");
        System.out.println("1. john.doe@example.com / password123 (Credit Score: 780)");
        System.out.println("2. jane.smith@example.com / password123 (Credit Score: 720)");
        System.out.println("3. alice.johnson@example.com / password123 (Credit Score: 650)");
    }
}