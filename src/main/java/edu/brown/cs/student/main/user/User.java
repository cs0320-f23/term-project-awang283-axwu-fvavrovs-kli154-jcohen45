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
  private String name;
  private String email;
  private String picture;
  private Set<Poster> createdPosters; // Assuming a user can have multiple posters
  private Set<Poster> savedPosters;
  private Set<Poster> drafts;
  private HashSet<String> interests;

  /** a no argument constructor so that Jackson can deserialize the json */
  public User() {
    this.id = UUID.randomUUID().toString();
    this.createdPosters = new HashSet<>();
    this.savedPosters = new HashSet<>();
    this.interests = new HashSet<>();
    this.drafts = new HashSet<>();
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

  public HashSet<String> getInterests() {
    return this.interests;
  }

  public void setInterests(HashSet<String> selectedInterests) {
    this.interests = selectedInterests;
  }

  public Set<Poster> getDrafts() {
    return this.drafts;
  }

  public void setDrafts(Set<Poster> drafts) {
    this.drafts = drafts;
  }
}
