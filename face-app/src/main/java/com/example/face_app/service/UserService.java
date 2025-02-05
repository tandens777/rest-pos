package com.example.face_app.service;

import com.example.face_app.model.User;
import com.example.face_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String username, String password, float[] facialFeatures) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Encode the password
        user.setFacialFeatures(facialFeatures);
        return userRepository.save(user);
    }

    public Optional<User> authenticateUser(float[] facialFeatures) {
        return userRepository.findAll().stream()
                .filter(user -> compareFacialFeatures(user.getFacialFeatures(), facialFeatures))
                .findFirst();
    }
    
    private boolean compareFacialFeatures(float[] storedFeatures, float[] inputFeatures) {
        // Use cosine similarity or Euclidean distance to compare feature vectors
        double similarity = cosineSimilarity(storedFeatures, inputFeatures);
        return similarity > 0.95; // Adjust threshold as needed
    }

    private double cosineSimilarity(float[] vectorA, float[] vectorB) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;
        for (int i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += Math.pow(vectorA[i], 2);
            normB += Math.pow(vectorB[i], 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}