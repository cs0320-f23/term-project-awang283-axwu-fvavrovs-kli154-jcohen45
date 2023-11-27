package edu.brown.cs.student.main;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import edu.brown.cs.student.main.types.PosterRepository;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * This class handles the logic of creating a poster. This involves validating the input data and
 * interacting with the database to persist the Poster object.
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
      if (posterRepository
          .findById(poster.getID())
          .isEmpty()) { // check if already exists in database
        Poster savedPoster = posterRepository.insert(poster);
        // Create a response object
        response = new ServiceResponse<>(savedPoster, "added to database");
      } else {
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

  @Async
  public CompletableFuture<ServiceResponse<Poster>> updatePoster(Poster updatedPoster) {

    Poster updated = posterRepository.save(updatedPoster);

    if (updated != null) {
      return CompletableFuture.completedFuture(new ServiceResponse<>(updated, "Poster updated"));
    } else {
      return CompletableFuture.completedFuture(new ServiceResponse<>("Failed to update poster"));
    }
  }

  @Async
  public CompletableFuture<List<Poster>> getPosters() {
    return CompletableFuture.completedFuture(posterRepository.findAll());
  }

  @Async
  public CompletableFuture<ServiceResponse<Poster>> getPosterById(String id) {
    return this.getPosters()
            .thenCompose(posters ->
                    posters.stream()
                            .filter(poster -> id.equals(poster.getID()))
                            .findFirst()
                            .map(poster -> CompletableFuture.completedFuture(new ServiceResponse<Poster>(poster, "poster with id found")))
                            .orElseGet(() -> CompletableFuture.completedFuture(new ServiceResponse<Poster>("Poster not found")))
            );
  }

  @Async
  public CompletableFuture<ServiceResponse<String>> deletePosterById(String id) {
    Optional<Poster> posterToDelete = posterRepository.findById(id);

    if (posterToDelete.isPresent()) {
      posterRepository.deleteById(id);
      return CompletableFuture.completedFuture(new ServiceResponse<>("Poster deleted"));
    } else {
      return CompletableFuture.completedFuture(new ServiceResponse<>("Poster not found"));
    }
  }
}
