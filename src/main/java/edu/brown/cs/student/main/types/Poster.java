package edu.brown.cs.student.main.types;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.UUID;

import edu.brown.cs.student.main.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The Poster model defines the necessary set of properties for a poster object and contains getters
 * and setters used to validate and change data
 */
@Document(collection = "poster")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Poster {

  // TODO: should probably update fields to include support for tags?
  @Id private String id; // or some identifier
  private String title; // req
  private String content; // url or image path
  private String description;
  private HashSet<String> tags;
  private String link; // link to club website? registration
  private String location; // location of event
  private LocalDateTime createdAt; // date poster is created in databsse
  private LocalDateTime startDate; // start of event
  private LocalDateTime endDate; // end of event
  private String organization;
  private String userId;
  private String isRecurring;
  private User user;

  // @JsonPropertyOrder({"id", "title", "description"})

  public Poster(String title, String description) {
    this.id = UUID.randomUUID().toString(); // so that IDs are randomly generated and unique
    this.title = title;
    this.content = content;
    this.description = description;
    this.tags = tags;
    // this.organization = org;

    this.tags = new HashSet<>();
    this.createdAt = LocalDateTime.now();
    this.startDate = null;
    this.endDate = null;
    //    this.isRecurring = Recurrence.NEVER;
    //    this.location = location;
    //    this.link = link;
  }

  public Poster(String title, String description, HashSet<String> tags) {
    this.id = UUID.randomUUID().toString(); // so that IDs are randomly generated and unique
    this.title = title;
    this.content = content;
    this.description = description;
    this.tags = tags;
    // this.organization = org;

    //    this.tags = new HashSet<>();
    this.createdAt = LocalDateTime.now();
    this.startDate = null;
    this.endDate = null;
    //    this.location = location;
    //    this.link = link;
  }

  /** allows user to input tags and organization, which i'm using to test search */

  /** Allows user to create poster w/o description of event */
  //  public Poster(String title, String content) {
  //    this.id = UUID.randomUUID().toString(); // so that IDs are randomly generated and unique
  //    this.title = title;
  //    this.content = content;
  //    this.tags = new HashSet<>();
  //    this.organization = "";
  //  }

  /** a no argument constructor so that Jackson can deserialize the json */
  public Poster() {
    this.id = UUID.randomUUID().toString();
    this.tags = new HashSet<>();
    this.createdAt = LocalDateTime.now();
    this.startDate = null;
    this.endDate = null;
  }

  @JsonProperty("id")
  public String getID() {
    return this.id;
  }

  public void setID(String newID) {
    this.id = newID;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getLocation() {
    return this.location;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public String getLink() {
    return this.link;
  }

  /** validates necessary fields */
  public Boolean isPoster() {
    return this.id != null;
  }

  // @JsonProperty("title")
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

  // @JsonProperty("description")
  public String getDescription() {
    return this.description;
  }

  public HashSet<String> getTags() {
    return tags;
  }

  public void setTags(HashSet<String> tags) {
    this.tags = tags;
  }

  public void setTag(String tag) {
    this.tags.add(tag);
  }

  public void deleteTag(String tag) {
    this.tags.remove(tag);
  }

  public String getIsRecurring() {
    return this.isRecurring;
  }

  public void setIsRecurring(String recurring) {
    this.isRecurring = recurring;
  }

  public LocalDateTime getCreatedAt() {

    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public LocalDateTime getEndDate() {
    return this.endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public String returnHaystack() {
    StringBuilder haystack = new StringBuilder(this.title);
    if (this.description != "") {
      haystack.append(this.description);
    }
    if (!this.tags.isEmpty()) {
      for (String tag : this.tags) {
        haystack.append(tag);
      }
    }
    return haystack.toString();
  }


  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }
}
