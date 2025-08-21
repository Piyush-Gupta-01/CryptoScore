package com.cryptoscore.controller;

import com.cryptoscore.dto.LoginRequest;
import com.cryptoscore.dto.SignupRequest;
import com.cryptoscore.dto.JwtResponse;
import com.cryptoscore.dto.MessageResponse;
import com.cryptoscore.model.Role;
import com.cryptoscore.model.User;
import com.cryptoscore.repository.UserRepository;
import com.cryptoscore.security.jwt.JwtUtils;
import com.cryptoscore.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getEmail(),
                userDetails.getWalletAddress(),
                userDetails.getCreditScore(),
                userDetails.getReputationTokens(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        roles.add(Role.BORROWER);
        user.setRoles(roles);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/wallet-connect")
    public ResponseEntity<?> connectWallet(@RequestBody WalletConnectRequest request) {
        // In a real implementation, you would verify the wallet signature
        // For demo purposes, we'll create or update a user with the wallet address
        
        User user = userRepository.findByWalletAddress(request.getWalletAddress())
                .orElse(new User());
        
        if (user.getId() == null) {
            // New wallet user
            user.setFirstName("Wallet");
            user.setLastName("User");
            user.setEmail(request.getWalletAddress() + "@wallet.local");
            user.setPassword(encoder.encode("wallet-user"));
            user.setWalletAddress(request.getWalletAddress());
            
            Set<Role> roles = new HashSet<>();
            roles.add(Role.USER);
            roles.add(Role.BORROWER);
            user.setRoles(roles);
            
            userRepository.save(user);
        }

        // Create UserDetailsImpl for JWT generation
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt,
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getWalletAddress(),
                user.getCreditScore(),
                user.getReputationTokens(),
                user.getRoles().stream().map(Role::name).collect(Collectors.toList())));
    }

    public static class WalletConnectRequest {
        private String walletAddress;
        private String signature;

        public String getWalletAddress() { return walletAddress; }
        public void setWalletAddress(String walletAddress) { this.walletAddress = walletAddress; }

        public String getSignature() { return signature; }
        public void setSignature(String signature) { this.signature = signature; }
    }
}