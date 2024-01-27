package edu.brown.cs.student.main;

import edu.brown.cs.student.main.types.Draft;
import edu.brown.cs.student.main.types.Poster;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DraftRepository extends MongoRepository<Draft, String> {
    // Here, you can define custom query methods if needed
    // For instance:
    // List<Poster> findByTitleContaining(String title);
    // Check mongorepo documentation for all the methods it comes with!!
}
