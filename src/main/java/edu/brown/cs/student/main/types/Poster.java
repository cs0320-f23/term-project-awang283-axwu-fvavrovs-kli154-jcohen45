package edu.brown.cs.student.main.types;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The Poster model defines the necessary set of properties for a poster object and contains getters
 * and setters used to validate and change data
 */
@Document(collection = "poster")
public class Poster {

  //TODO: should probably update fields to include support for tags?
  @Id private String id; // or some identifier
  private String title;
  private String content; // url or image path
  private String description;

  @JsonPropertyOrder({"id", "title", "description"})
  public Poster(String title, String content, String description) {
    // i turned ID to a string
    this.id = UUID.randomUUID().toString(); // so that IDs are randomly generated and unique
    this.title = title;
    this.content = content;
    this.description = description;
  }
  /**
  Allows user to create poster w/o description of event
   */
  public Poster(String title, String content) {
    this.id = UUID.randomUUID().toString(); // so that IDs are randomly generated and unique
    this.title = title;
    this.content = content;
  }

  /** a no argument constructor so that Jackson can deserialize the json */
  public Poster() {
    this.id = UUID.randomUUID().toString();
  }

  @JsonProperty("id")
  public String getID() {
    return this.id;
  }

  public void setID(String newID){
    this.id = newID;
  }

  /**
  validates necessary fields
   */
  public Boolean isPoster() {
    return this.id != null && this.title != null && this.content != null;
  }

  @JsonProperty("title")
  public String getTitle() {
    return this.title;
  }

  /**
   * Allows user to change title of the poster
   *
   * @param newTitle the new title to set the title to
   */
  public void setTitle(String newTitle) {
    this.title = newTitle;
  }

  /**
   * Allows user to change image of the poster
   *
   * @param newContent the new title to set the title to
   */
  public void setContent(String newContent) {
    this.content = newContent;
  }

  @JsonProperty("content")
  public String getContent() {
    return this.content;
  }

  // TODO: possibly implement tip tap so you don't have to
  // resend the whole desc, you can just edit a couple characters
  /**
   * Allows user to edit description of the poster
   *
   * @param newDesc the new title to set the title to
   */
  public void setDescription(String newDesc) {
    this.description = newDesc;
  }

  @JsonProperty("description")
  public String getDescription() {
    return this.description;
  }
}
