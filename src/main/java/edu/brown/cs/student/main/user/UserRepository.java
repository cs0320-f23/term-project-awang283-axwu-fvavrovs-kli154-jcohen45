package edu.brown.cs.student.main.user;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
  // Custom query methods if needed
  // User findByUsername(String username);
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);
}
