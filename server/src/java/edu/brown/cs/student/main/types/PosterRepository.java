package edu.brown.cs.student.main.types;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PosterRepository extends MongoRepository<Poster, String> {
    // Here, you can define custom query methods if needed
    // For instance:
    // List<Poster> findByTitleContaining(String title);
    //Check mongorepo documentation for all the methods it comes with!!
}
