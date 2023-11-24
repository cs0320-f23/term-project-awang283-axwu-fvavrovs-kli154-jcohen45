package edu.brown.cs.student.main;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import edu.brown.cs.student.main.types.PosterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

/**
 * This class handles the logic of creating a poster.
 * This involves validating the input data and interacting
 * with the database to persist the Poster object.
 */
@Service
public class PosterService {
    private final PosterRepository posterRepository;

    @Autowired
    public PosterService(PosterRepository posterRepository) {
        this.posterRepository = posterRepository;
    }

    @Async
    public CompletableFuture<ServiceResponse<Poster>> createPoster(Poster poster) {
        ServiceResponse<Poster> response;
        // Save the Poster object to the database
        if (poster.isPoster()) {
            if(posterRepository.findById(poster.getID()).isEmpty()){ //check if already exists in database
                Poster savedPoster = posterRepository.insert(poster);
                // Create a response object
                response = new ServiceResponse<>(savedPoster, "added to database");
            }
            else {
                Poster savedPoster = posterRepository.save(poster);
                // Create a response object
                response = new ServiceResponse<>(savedPoster, "saved to database");
            }
        } else {
            response = new ServiceResponse<>(poster, "not added to database");
        }
        // CompletableFuture is basically a Promise
        return CompletableFuture.completedFuture(response);
    }
}
