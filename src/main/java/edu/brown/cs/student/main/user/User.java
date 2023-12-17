package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.types.Poster;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {
  @Id private String id; // or some identifier
  private String username;
  private String name;
  private String email;
  private Set<Poster> posters; // Assuming a user can have multiple posters

  /** a no argument constructor so that Jackson can deserialize the json */
  public User() {
    this.id = UUID.randomUUID().toString();
    this.posters = new HashSet<>();
  }
  // Getters and Setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Poster> getPosters() {
    return posters;
  }

  public void setPosters(Set<Poster> posters) {
    this.posters = posters;
  }
}
