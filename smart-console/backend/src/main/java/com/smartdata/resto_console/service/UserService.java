package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.User;
import com.smartdata.resto_console.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.smartdata.resto_console.exception.GenericNotFoundException;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUser(Long id) throws GenericNotFoundException {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            return user;
        } else {
            throw new GenericNotFoundException("User not found with id: " + id);
        }
    }

    public Optional<User> findByPinCode(String rawPincode) {
        return userRepository.findAll().stream()
                .filter(user -> passwordEncoder.matches(rawPincode, user.getPassword()))
                .findFirst();
    }

    public Optional<User> findByFacialFeatures(double[] facialFeatures) {
        if (facialFeatures == null || facialFeatures.length == 0) {
            System.out.println("Facial features are empty or null, skipping comparison.");
            return Optional.empty(); // Return empty if the input is invalid
        }
    
         return userRepository.findAll().stream()
                .filter(user -> {
                    double[] storedFeatures = user.getFacialFeaturesAsArray();
                    System.out.println("USER" + user.getUsername() + "  Facial:" + user.getFacialFeatures());
                    return storedFeatures != null && storedFeatures.length > 0 && compareFacialFeatures(storedFeatures, facialFeatures);
                })
                .findFirst();
    }
    
    public boolean compareFacialFeatures(double[] storedFeatures, double[] inputFeatures) {
        // Use cosine similarity or Euclidean distance to compare feature vectors
        double similarity = cosineSimilarity(storedFeatures, inputFeatures);
        return similarity > 0.95; // Adjust threshold as needed
    }

    private double cosineSimilarity(double[] vectorA, double[] vectorB) {
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

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

