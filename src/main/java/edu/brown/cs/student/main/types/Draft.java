package edu.brown.cs.student.main.types;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.brown.cs.student.main.types.Poster;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;

@Document(collection = "drafts")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Draft extends Poster {
    public Draft(){
        super();
    }

    public Draft(String title, String description){
        super(title, description);
    }

    public Draft(String title, String description, HashSet<String> tags){
        super(title, description, tags);
    }
}

