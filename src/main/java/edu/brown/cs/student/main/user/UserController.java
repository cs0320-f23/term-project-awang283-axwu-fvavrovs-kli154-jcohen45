package edu.brown.cs.student.main.user;
import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public CompletableFuture<ResponseEntity<List<User>>> getAllUsers() {
        return userService.getAllUsers()
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<ServiceResponse<User>>> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping("/create")
    public CompletableFuture<ResponseEntity<ServiceResponse<User>>> createUser(@RequestBody User user) {
        return userService.createUser(user)
                .thenApply(response -> ResponseEntity.ok(response));
    }

    @PutMapping("/update/{id}")
    public CompletableFuture<ResponseEntity<ServiceResponse<User>>> updateUser(
            @PathVariable String id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser)
                .thenApply(response -> ResponseEntity.ok(response));
    }

    @DeleteMapping("/delete/{id}")
    public CompletableFuture<ResponseEntity<ServiceResponse<Object>>> deleteUser(@PathVariable String id) {
        return userService.deleteUser(id)
                .thenApply(response -> ResponseEntity.ok(response));
    }
}