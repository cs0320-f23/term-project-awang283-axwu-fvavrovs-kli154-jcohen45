package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Async
  public CompletableFuture<ServiceResponse<User>> createUser(User user) {
    ServiceResponse<User> response;

    // Validate user data
    if (user == null || isNullOrEmpty(user.getEmail()) || isNullOrEmpty(user.getName())) {

      response = new ServiceResponse<>("Invalid user data");
    } else {
      // Check if the username is already taken
      if (userRepository.findById(user.getId()).isPresent()) {
        response = new ServiceResponse<>("User is already created");
      } else {
        // Check if the email is already taken
        //        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        //          response = new ServiceResponse<>("Email is already taken");
        //        } else {

        // Save the User object to the database
        User savedUser = userRepository.save(user);

        // Determine the response message based on whether the user was inserted or updated
        String message =
            userRepository.existsById(user.getId()) ? "saved to database" : "added to database";

        // Create a response object
        response = new ServiceResponse<>(savedUser, message);
      }
    }
    // }

    // CompletableFuture is basically a Promise
    return CompletableFuture.completedFuture(response);
  }
  // Helper method to check if a string is null or empty
  private boolean isNullOrEmpty(String str) {
    return str == null || str.trim().isEmpty();
  }

  public CompletableFuture<ServiceResponse<User>> getUserById(String id) {
    Optional<User> userOptional = userRepository.findById(id);

    return userOptional
        .map(user -> CompletableFuture.completedFuture(new ServiceResponse<>(user, "User found")))
        .orElseGet(
            () -> CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }


    public CompletableFuture<ServiceResponse<User>> getUserPosters(String id) {
        Optional<User> userOptional = userRepository.findById(id);

        return userOptional
                .map(user -> CompletableFuture.completedFuture(new ServiceResponse<>(user, "User found")))
                .orElseGet(
                        () -> CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
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

  @Async
  public CompletableFuture<ServiceResponse<User>> associatePosterWithUser(
      String userId, Poster poster, boolean isDraft) {
    // Find the user by ID
    System.out.println("reached associatePosterWithUser function");
    return userRepository
        .findById(userId)
        .map(
            user -> {
              // Set the user ID in the poster
              poster.setUserId(userId);
              // Add the poster to the user's list of posters
              if (isDraft) {
                user.getDrafts().add(poster);
              }
              else {
                user.getCreatedPosters().add(poster);
                  System.out.println("attempted to add poster to user's hashset");
              }

              // Save the updated user
              System.out.println("Trying to save");

              userRepository.save(user);


              // Create a response object
              System.out.println("Trying to return service response");
              return new ServiceResponse<>(user, "Poster associated with user");
            })
        .map(CompletableFuture::completedFuture) // Remove this line
        .orElse(CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }

  @Async
  public CompletableFuture<ServiceResponse<User>> removeFromDrafts(String userId, Poster poster) {
    // Find the user by ID
    return userRepository
        .findById(userId)
        .map(
            user -> {
              // Set the user ID in the poster
              // Add the poster to the user's list of posters
              for (Poster draft : user.getDrafts()) {
                if (draft.getID().equals(poster.getID())) {
                  user.getDrafts().remove(draft);
                  break;
                }
              }
              // user.getDrafts().remove(poster);

              // Save the updated user

              System.out.println("Trying to save");
              this.updateUser(user);


              // Create a response object
              System.out.println("Trying to return service response");
              return new ServiceResponse<>(user, "Poster associated with user");
            })
        .map(CompletableFuture::completedFuture) // Remove this line
        .orElse(CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }

  @Async
  public CompletableFuture<ServiceResponse<User>> savePoster(String userId, Poster poster) {
    // Find the user by ID
    // System.out.println("reached associatePosterWithUser function");
    return userRepository
        .findById(userId)
        .map(
            user -> {
              // Add the poster to the user's list of posters
              user.getSavedPosters().add(poster);
              // Save the updated user
              // System.out.println("Trying to save");
              this.updateUser(user);
              // Create a response object
              // System.out.println("Trying to return service response");
              return new ServiceResponse<>(user, "Poster saved");
            })
        .map(CompletableFuture::completedFuture) // Remove this line
        .orElse(CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }

  @Async
  public CompletableFuture<ServiceResponse<User>> unsavePoster(String userId, String posterId) {
    // Find the user by ID
    // System.out.println("reached associatePosterWithUser function");
    return userRepository
        .findById(userId)
        .map(
            user -> {
              // Add the poster to the user's list of posters
              Set<Poster> userPosters = user.getSavedPosters();
              userPosters.removeIf(foundPoster -> foundPoster.getID().equals(posterId));
              user.setSavedPosters(userPosters);
              // Save the updated user
              System.out.println(userPosters);

              this.updateUser(user);
              // Create a response object
              // System.out.println("Trying to return service response");
              return new ServiceResponse<>(user, "Poster removed from user");
            })
        .map(CompletableFuture::completedFuture) // Remove this line
        .orElse(CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }

  @Async
  public CompletableFuture<ServiceResponse<User>> addInterests(
      String userId, HashSet<String> interests) {
    // Find the user by ID
    // System.out.println("reached associatePosterWithUser function");
    return userRepository
        .findById(userId)
        .map(
            user -> {
              HashSet<String> currInterests = user.getInterests();
              currInterests.addAll(interests);
              user.setInterests(currInterests);
              this.updateUser(user);

              return new ServiceResponse<>(user, "Interest(s) added");
            })
        .map(CompletableFuture::completedFuture) // Remove this line
        .orElse(CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }

  @Async
  public CompletableFuture<ServiceResponse<User>> removeInterests(
      String userId, Set<String> interests) {
    // Find the user by ID
    // System.out.println("reached associatePosterWithUser function");
    return userRepository
        .findById(userId)
        .map(
            user -> {
              HashSet<String> currInterests = user.getInterests();
              for (String interest : interests) {
                if (currInterests.contains(interest)) {
                  currInterests.remove(interest);
                } else {
                  return new ServiceResponse<>(
                      user, "Interest to be removed is not in user's selected interests");
                }
              }
              user.setInterests(currInterests);
              this.updateUser(user);

              return new ServiceResponse<>(user, "Interest(s) removed");
            })
        .map(CompletableFuture::completedFuture) // Remove this line
        .orElse(CompletableFuture.completedFuture(new ServiceResponse<>("User not found")));
  }
}
