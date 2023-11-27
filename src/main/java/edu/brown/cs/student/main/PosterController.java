package edu.brown.cs.student.main;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/posters") // maps the controller to the "/posters" endpoint.
public class PosterController {
  private final PosterService posterService;

  public PosterController(PosterService posterService) {
    this.posterService = posterService;
  }

  @GetMapping("/")
  public CompletableFuture<ResponseEntity<List<Poster>>> getAllPosters() {
    return posterService
            .getPosters()
            .thenApply(ResponseEntity::ok)
            .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @GetMapping("/{id}") // is this the correct way to be able to type in an id idk
  public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> getPosterById(
          @PathVariable String id) {
    return posterService
            .getPosterById(id)
            .thenApply(ResponseEntity::ok)
            .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @PostMapping(value = "/create") // sends a POST request to the mapping /poster/create
  public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> createPoster(
          @RequestBody Poster poster) {
    return this.posterService
            .createPoster(poster)
            .thenApply(response -> ResponseEntity.ok(response)) // good response
            .exceptionally(
                    ex ->
                            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                    .body(new ServiceResponse<>(poster, ex.getMessage())));
  }

  @DeleteMapping("/delete/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<Object>>> deletePoster(
            @PathVariable String id) {
        return posterService
                .getPosterById(id)
                .thenCompose(existingPoster -> {
                    if (existingPoster.getData() != null) {
                        return posterService.deletePosterById(id)
                                .thenApply(deleted -> new ServiceResponse<>("Poster deleted"));
                    } else {
                        return CompletableFuture.completedFuture(new ServiceResponse<>("Poster not found"));
                    }
                })
                .thenApply(response -> ResponseEntity.ok(response))
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @PutMapping("/update/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> updatePoster(
            @PathVariable String id,
            @RequestBody Poster updatedPoster) {
        return posterService
                .getPosterById(id)
                .thenCompose(existingPoster -> {
                    if (existingPoster.getData() != null) {
                        updatedPoster.setID(id); // Ensure ID consistency if needed
                        return posterService.updatePoster(updatedPoster);
                    } else {
                        return CompletableFuture.completedFuture(new ServiceResponse<>("Poster not found"));
                    }
                })
                .thenApply(response -> ResponseEntity.ok(response))
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }


}
