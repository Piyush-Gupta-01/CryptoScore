package com.cryptoscore.controller;

import com.cryptoscore.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/credit")
public class CreditScoreController {

    @GetMapping("/score")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCreditScore(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Map<String, Object> response = new HashMap<>();
        response.put("score", userDetails.getCreditScore());
        response.put("grade", getGradeFromScore(userDetails.getCreditScore()));
        response.put("userId", userDetails.getId());
        
        // Mock factors
        Map<String, Integer> factors = new HashMap<>();
        factors.put("paymentHistory", 85);
        factors.put("creditUtilization", 72);
        factors.put("defiActivity", 90);
        factors.put("walletAge", 78);
        factors.put("transactionVolume", 82);
        response.put("factors", factors);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCreditHistory(Authentication authentication) {
        // Mock credit score history
        List<Map<String, Object>> history = new ArrayList<>();
        
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        int[] scores = {650, 675, 690, 720, 745, 780};
        
        for (int i = 0; i < months.length; i++) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("month", months[i]);
            entry.put("score", scores[i]);
            entry.put("change", i > 0 ? scores[i] - scores[i-1] : 0);
            history.add(entry);
        }
        
        return ResponseEntity.ok(history);
    }

    @GetMapping("/recommendations")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRecommendations(Authentication authentication) {
        List<Map<String, Object>> recommendations = new ArrayList<>();
        
        Map<String, Object> rec1 = new HashMap<>();
        rec1.put("title", "Increase DeFi Activity");
        rec1.put("description", "Participate in more DeFi protocols to demonstrate financial sophistication");
        rec1.put("impact", "high");
        rec1.put("category", "defi");
        recommendations.add(rec1);
        
        Map<String, Object> rec2 = new HashMap<>();
        rec2.put("title", "Maintain Payment History");
        rec2.put("description", "Continue making timely loan repayments to maintain excellent payment history");
        rec2.put("impact", "high");
        rec2.put("category", "payments");
        recommendations.add(rec2);
        
        Map<String, Object> rec3 = new HashMap<>();
        rec3.put("title", "Diversify Portfolio");
        rec3.put("description", "Hold a more diverse range of crypto assets to reduce risk profile");
        rec3.put("impact", "medium");
        rec3.put("category", "portfolio");
        recommendations.add(rec3);
        
        return ResponseEntity.ok(recommendations);
    }

    private String getGradeFromScore(Integer score) {
        if (score >= 800) return "A+";
        if (score >= 750) return "A";
        if (score >= 700) return "B+";
        if (score >= 650) return "B";
        if (score >= 600) return "C+";
        if (score >= 550) return "C";
        return "D";
    }
}