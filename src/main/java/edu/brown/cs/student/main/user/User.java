package edu.brown.cs.student.main.user;

import edu.brown.cs.student.main.types.Poster;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;
@Document(collection = "user")
    public class User {
    @Id
    private String id; // or some identifier
    private String username;
    private String name;
    private String email;
    private Set<Poster> posters; // Assuming a user can have multiple posters

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
}
