package edu.brown.cs.student.main;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/posters") // maps the controller to the "/posters" endpoint.
public class PosterController {
    private final PosterService posterService;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    @GetMapping("/")
    public CompletableFuture<ResponseEntity<List<Poster>>> getAllPosters() {
        return posterService.getPosters()
                .thenApply(ResponseEntity::ok)
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping("/:id")
    public CompletableFuture<ResponseEntity<ServiceResponse<Object>>> getPosterById(@RequestBody String id) {
        return posterService.getPosterById(id)
                .thenApply(ResponseEntity::ok)
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }


    @PostMapping(value = "/create") //sends a POST request to the mapping /poster/create
    public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> createPoster(@RequestBody Poster poster) {
        return this.posterService.createPoster(poster)
                .thenApply(response -> ResponseEntity.ok(response)) //good response
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ServiceResponse<>(poster, ex.getMessage())));
    }
}
