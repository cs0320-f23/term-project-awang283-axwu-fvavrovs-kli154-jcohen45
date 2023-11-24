package edu.brown.cs.student.main.types;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

/**
 * The Poster model defines the necessary set of properties for a poster object and
 *  contains getters and setters used to validate and change data
 */
@Document
public class Poster {

    @Id
    private UUID id; // or some identifier
    private String title;
    private String content; //url or image path
    private String description;

    public Poster(String title, String content, String description) {
        this.id = UUID.randomUUID(); //so that IDs are randomly generated and unique
        this.title = title;
        this.content = content;
        this.description = description;

    }
    /*
    Allows user to create poster w/o description of event
     */
    public Poster(String title, String content) {
        this.id = UUID.randomUUID(); //so that IDs are randomly generated and unique
        this.title = title;
        this.content = content;
    }

    public String getID() {
        return this.id.toString();
    }

    /*
    validates necessary fields
     */
    public Boolean isPoster() {
        return this.id != null && this.title != null && this.content != null;

    }

    public String getTitle() {
        return this.title;
    }

    /**
     * Allows user to change title of the poster
     * @param newTitle the new title to set the title to
     */
    public void editTitle(String newTitle) {
        this.title = newTitle;
    }

    /**
     * Allows user to change image of the poster
     * @param newContent the new title to set the title to
     */
    public void editContent(String newContent) {
        this.content = newContent;
    }


    //TODO: possibly implement tip tap so you don't have to
    // resend the whole desc, you can just edit a couple characters
    /**
     * Allows user to edit description of the poster
     * @param newDesc the new title to set the title to
     */
    public void editDescription(String newDesc) {
        this.description = newDesc;
    }
}
