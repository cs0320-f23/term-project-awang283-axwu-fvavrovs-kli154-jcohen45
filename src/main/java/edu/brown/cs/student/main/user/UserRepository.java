package edu.brown.cs.student.main.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
  // Custom query methods if needed
  // User findByUsername(String username);
 // Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);
}
