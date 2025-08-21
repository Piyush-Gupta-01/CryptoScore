package com.cryptoscore.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/test")
public class TestController {
    
    @GetMapping("/all")
    public String allAccess() {
        return "CryptoScore Backend is running! Public Content.";
    }
    
    @GetMapping("/health")
    public String healthCheck() {
        return "Backend is healthy and ready to serve requests!";
    }
}