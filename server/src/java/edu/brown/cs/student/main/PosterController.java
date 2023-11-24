package edu.brown.cs.student.main;

import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/poster") // maps the controller to the "/poster" endpoint.
public class PosterController {
    private final PosterService posterService;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    @PostMapping("/create") //sends a POST request to the mapping /poster/create
    public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> createPoster(@RequestBody Poster poster) {
        return posterService.createPoster(poster)
                .thenApply(response -> ResponseEntity.ok(response)) //good response
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ServiceResponse<>(poster, ex.getMessage())));
    }
}
