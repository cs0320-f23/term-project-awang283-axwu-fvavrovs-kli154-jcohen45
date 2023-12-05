package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.user.User;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface UserService {
    CompletableFuture<ServiceResponse<User>> createUser(User user);
    CompletableFuture<ServiceResponse<User>> updateUser(String id, User updatedUser);
    CompletableFuture<ServiceResponse<List<User>>> getAllUsers();
    CompletableFuture<ServiceResponse<User>> getUserById(String id);
    CompletableFuture<ServiceResponse<Object>> deleteUser(String id);
}
