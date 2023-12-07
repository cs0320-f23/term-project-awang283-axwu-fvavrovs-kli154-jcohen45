package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.user.User;

import edu.brown.cs.student.main.responses.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Async
    public CompletableFuture<ServiceResponse<User>> createUser(User user) {
        ServiceResponse<User> response;

        // Validate user data
        if (user == null || user.getUsername() == null || user.getEmail() == null || user.getPassword() == null) {
            response = new ServiceResponse<>("Invalid user data");
        } else {
            // Check if the username is already taken
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                response = new ServiceResponse<>("Username is already taken");
            } else {
                // Check if the email is already taken
                if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                    response = new ServiceResponse<>("Email is already taken");
                } else {
                    // Hash the user's password before saving it to the database
                    user.setPassword(passwordEncoder.encode(user.getPassword()));

                    // Save the User object to the database
                    User savedUser = userRepository.save(user);

                    // Determine the response message based on whether the user was inserted or updated
                    String message = userRepository.existsById(user.getId()) ? "saved to database" : "added to database";

                    // Create a response object
                    response = new ServiceResponse<>(savedUser, message);
                }
            }
        }

        // CompletableFuture is basically a Promise
        return CompletableFuture.completedFuture(response);
    }


    public CompletableFuture<ServiceResponse<User>> getUserById(String id) {
        Optional<User> userOptional = userRepository.findById(id);

        return userOptional.map(
                        user -> CompletableFuture.completedFuture(new ServiceResponse<>(user, "User found")))
                .orElseGet(() -> CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
    }


    public CompletableFuture<List<User>> getAllUsers() {
        return CompletableFuture.completedFuture(userRepository.findAll());
    }


    public CompletableFuture<ServiceResponse<User>> updateUser(User updatedUser) {
        // Implement logic to update user data, e.g., change name, email, etc.

        User updated = userRepository.save(updatedUser);

        if (updated != null) {
            return CompletableFuture.completedFuture(new ServiceResponse<>(updated, "User updated"));
        } else {
            return CompletableFuture.completedFuture(new ServiceResponse<>("Failed to update user"));
        }
    }

    public CompletionStage<Object> deleteUserById(String id) {
        Optional<User> userToDelete = userRepository.findById(id);

        if (userToDelete.isPresent()) {
            userRepository.deleteById(id);
            return CompletableFuture.completedFuture(new ServiceResponse<>("User deleted"));
        } else {
            return CompletableFuture.completedFuture(new ServiceResponse<>("User not found"));
        }
    }
}