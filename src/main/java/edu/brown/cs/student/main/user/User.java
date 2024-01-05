package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.types.Poster;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Document(collection = "user")
public class User {
  @Id private String id; // or some identifier
  private String name;
  private String email;
  private String picture;
  private Set<Poster> createdPosters; // Assuming a user can have multiple posters
  private Set<Poster> savedPosters;

  /** a no argument constructor so that Jackson can deserialize the json */
  public User() {
    this.id = UUID.randomUUID().toString();
    this.createdPosters = new HashSet<>();
    this.savedPosters = new HashSet<>();
  }
  // Getters and Setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
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

  public Set<Poster> getCreatedPosters() {
    return createdPosters;
  }

  public void setCreatedPosters(Set<Poster> createdPosters) {
    this.createdPosters = createdPosters;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public Set<Poster> getSavedPosters() {
    return savedPosters;
  }

  public void setSavedPosters(Set<Poster> savedPosters) {
    this.savedPosters = savedPosters;
  }
}
