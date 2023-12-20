package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.responses.ServiceResponse;

import org.springframework.http.HttpHeaders;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/")
  public CompletableFuture<ResponseEntity<List<User>>> getAllUsers() {
    return userService.getAllUsers().thenApply(ResponseEntity::ok);
  }

  @GetMapping("/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<User>>> getUserById(
      @PathVariable String id) {
    return userService.getUserById(id).thenApply(ResponseEntity::ok);
  }

  @PostMapping(value = "/create", produces = "application/json")
  public CompletableFuture<ResponseEntity<ServiceResponse<User>>> createUser(
      @RequestBody User user) {
    return userService.createUser(user).thenApply(response -> ResponseEntity.ok(response));
  }


    @RequestMapping(value = "/create", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptionsRequest() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:5173");
        headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Max-Age", "3600"); // Optional, sets preflight request cache duration

        return new ResponseEntity<>(headers, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<Object>>> deleteUser(
      @PathVariable String id) {
    return userService
        .getUserById(id)
        .thenCompose(
            existingUser -> {
              if (existingUser.getData() != null) {
                return userService
                    .deleteUserById(id)
                    .thenApply(deleted -> new ServiceResponse<>("User with id " + id + " deleted"));
              } else {
                return CompletableFuture.completedFuture(
                    new ServiceResponse<>("User with id " + id + " not found"));
              }
            })
        .thenApply(response -> ResponseEntity.ok(response))
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @PutMapping("/update/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<User>>> updateUser(
      @PathVariable String id, @RequestBody User updatedUser) {
    return userService
        .getUserById(id)
        .thenCompose(
            existingUser -> {
              if (existingUser.getData() != null) {
                updatedUser.setId(id); // Ensure ID consistency
                return userService.updateUser(updatedUser);
              } else {
                return CompletableFuture.completedFuture(
                    new ServiceResponse<>("User with id " + id + " not found"));
              }
            })
        .thenApply(response -> ResponseEntity.ok(response))
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }
}
