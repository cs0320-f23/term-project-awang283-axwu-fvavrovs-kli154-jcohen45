package edu.brown.cs.student.main.types;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.HashSet;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drafts")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Draft extends Poster {
  public Draft() {
    super();
    this.setIsDraft(true);
  }

  public Draft(String title, String description) {
    super(title, description);
    this.setIsDraft(true);
  }

  public Draft(String title, String description, HashSet<String> tags) {
    super(title, description, tags);
    this.setIsDraft(true);
  }
}
