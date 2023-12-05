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
    private String password;
    private Set<Poster> posters; // Assuming a user can have multiple posters

        // Constructors, getters, setters...

        // Additional methods as needed
}
