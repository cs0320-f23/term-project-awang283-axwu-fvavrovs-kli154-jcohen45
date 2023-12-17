package edu.brown.cs.student.main;

import edu.brown.cs.student.main.imgur.ImgurService;
import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/** This class defines the mappings and endpoints for poster management */
@RestController
@RequestMapping(value = "/posters") // maps the controller to the "/posters" endpoint.
public class PosterController {

  private final PosterService posterService; // instance of the class that does all the dirty work
  private final ImgurService imgurService;

  public PosterController(PosterService posterService, ImgurService imgurService) {
    this.posterService = posterService;
    this.imgurService = imgurService;
  }

  /**
   * Sends a GET request for all posters (sorted by start date)
   *
   * @return all posters (JSONified)
   */
  @GetMapping("/")
  public CompletableFuture<ResponseEntity<List<Poster>>> getAllPosters() {
    return this.sortBySoonest(posterService.getPosters())
        .thenApply(ResponseEntity::ok)
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  /**
   * sends a GET request for one specific poster
   *
   * @param id the id (string) for the poster
   * @return a JSONified ServiceResponse instance that contains a "message" (string) field and, if
   *     poster with id exists, a "data" (JSON) field that contains the data associated with that
   *     poster
   */
  @GetMapping("/{id}") // params like id should be enclosed in squiggly brackets
  public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> getPosterById(
      @PathVariable String id) {
    return posterService
        .getPosterById(id)
        .thenApply(ResponseEntity::ok)
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  /**
   * sends a GET request to filter by tag(s)
   *
   * @param tag an array of tags (strings)
   * @param date this is optional, should be "createdAt" to sort by create date
   * @return a list of all posters matching the requested tags
   */
  @GetMapping("/tag")
  public CompletableFuture<ResponseEntity<List<Poster>>> getPosterByTag(
      @RequestParam String[] tag, @RequestParam(required = false) String date) {
    CompletableFuture<List<Poster>> postersFuture;
    if (tag.length == 1) {
      // If there is only one tag, use the searchByTag method
      postersFuture = posterService.searchByTag(tag[0]);
    } else {
      // If there are multiple tags, use the searchByMultipleTags method
      postersFuture = posterService.searchByMultipleTags(tag);
    }

    if (date != null && date.equals("createdAt")) {
      return postersFuture
          .thenApply(
              posters ->
                  posters.stream()
                      .sorted(Comparator.comparing(Poster::getCreatedAt)) // Sort by createdAt date
                      .collect(Collectors.toList()))
          .thenApply(ResponseEntity::ok)
          .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
    // sort by start date by default
    return this.sortBySoonest(postersFuture)
        .thenApply(ResponseEntity::ok)
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  /**
   * sends GET request to search by keyword term
   *
   * @param term required keyword or phrase
   * @param tags required but it can be blank if there are no tags, e.g.
   *     http://localhost:8080/posters/term? term=[term]&tags=
   * @param date optional, should be "createdAt" to sort by create date
   * @return
   */
  @GetMapping("/term")
  public CompletableFuture<ResponseEntity<List<Poster>>> getPosterByTerm(
      @RequestParam String term,
      @RequestParam(required = false) String[] tags,
      @RequestParam(required = false) String date) {
    if (date != null && date.equals("createdAt")) {
      return posterService
          .searchByTerm(term, tags)
          .thenApply(
              posters ->
                  posters.stream()
                      .sorted(Comparator.comparing(Poster::getCreatedAt))
                      .collect(Collectors.toList()))
          .thenApply(ResponseEntity::ok)
          .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    // sort by start date by default
    return this.sortBySoonest(posterService.searchByTerm(term, tags))
        .thenApply(ResponseEntity::ok)
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  /**
   * Gets everything in a requested field, e.g. all tags, all organizations, all titles. Accepted
   * request parameters are "title," "organization," and "tags"
   *
   * @param field
   * @return
   */
  @GetMapping("/all")
  public CompletableFuture<ResponseEntity<HashSet<Object>>> getAllFieldVars(
      @RequestParam String field) {
    return posterService
        .getAllFields(field)
        .thenApply(ResponseEntity::ok)
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @GetMapping("/alltags")
  public ArrayList<String> getAllTags() {
    Tags tags = new Tags();
    return tags.getTags();
  }

  // TODO: have some error checking (on frontend) to display an error if the link is corrupted
  @PostMapping(value = "/create/fromlink")
  public CompletableFuture<ServiceResponse<Poster>> createFromLink(
      @RequestBody Content content, @RequestParam String userId) {
    Poster poster = new Poster();
    poster.setContent(content.getContent());
    this.posterService.createPoster(poster, userId);
    return CompletableFuture.completedFuture(
        new ServiceResponse<Poster>(poster, "created new poster using existing link"));
  }

  /**
   * sends a POST request to the mapping /poster/create
   *
   * @return a JSONified ServiceResponse instance that contains a "message" (string) field and a
   *     "data" (JSON) field that contains the data ofi the poster that was just created
   */
  @PostMapping(value = "/create/imgur")
  public CompletableFuture<ServiceResponse<Poster>> createImgurLink(
      @RequestBody MultipartFile content, @RequestParam String userId) {
    Poster poster = new Poster();
    ServiceResponse<String> imgurResponse = imgurService.uploadToImgur(content);
    poster.setContent(imgurResponse.getData());
    this.posterService.createPoster(poster, userId);
    return CompletableFuture.completedFuture(
        new ServiceResponse<Poster>(poster, "uploaded to imgur"));
  }

  /**
   * sends a POST request to the mapping /poster/create
   *
   * @return a JSONified ServiceResponse instance that contains a "message" (string) field and a
   *     "data" (JSON) field that contains the data of the poster that was just created
   */

  /** JUST FOR MONGO. DO NOT USE IN CODE. */
  @DeleteMapping("/delete")
  public void deleteAll() {
    posterService.deleteAll();
  }

  /**
   * sends a DELETE request to delete a poster
   *
   * @param id the id (string) of the poster to be deleted
   * @return a JSONified ServiceResponse instance that contains a "message" (string) field and a
   *     "data" (JSON) field that contains the data of the poster that was just deleted
   */
  @DeleteMapping("/delete/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<Object>>> deletePoster(
      @PathVariable String id) {

    return posterService
        .getPosterById(id)
        .thenCompose(
            existingPoster -> {
              if (existingPoster.getData() != null) {
                return posterService
                    .deletePosterById(id)
                    .thenApply(
                        deleted -> new ServiceResponse<>("Poster with id " + id + "deleted"));
              } else {
                return CompletableFuture.completedFuture(
                    new ServiceResponse<>("Poster with id " + id + "not found"));
              }
            })
        .thenApply(response -> ResponseEntity.ok(response))
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  /**
   * sends a PUT request to update an existing poster. When integrated with the frontend, usage of
   * this endpoint will likely entail getting the details of an existing poster, then creating a
   * JSON object that contains some old data mixed with new data (since users will likely only want
   * to update 1 field at a time)
   *
   * @param id the id of the poster to be updated
   * @param updatedPoster the new poster filled in with fields that you want (see fields expected in
   *     Poster class) expected in JSON format in the request body
   * @return instance that contains a "message" (string) field and, if successful (the id is found),
   *     a "data" (JSON) field that contains the data of the poster that was just deleted
   */
  @PutMapping("/update/{id}")
  public CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> updatePoster(
      @PathVariable String id, @RequestBody Poster updatedPoster) {
    return posterService
        .getPosterById(id)
        .thenCompose(
            existingPoster -> {
              if (existingPoster.getData() != null) {
                updatedPoster.setID(id); // Ensure ID consistency
                return posterService.updatePoster(updatedPoster);
              } else {
                return CompletableFuture.completedFuture(
                    new ServiceResponse<>("Poster with id " + id + " not found"));
              }
            })
        .thenApply(response -> ResponseEntity.ok(response))
        .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  public CompletableFuture<List<Poster>> sortBySoonest(CompletableFuture<List<Poster>> myPosters) {
    CompletableFuture<List<Poster>> beforePosters =
        myPosters.thenApply(
            posters ->
                posters.stream()
                    .filter(poster -> poster.getStartDate().isBefore(LocalDateTime.now()))
                    .sorted(
                        Comparator.nullsLast(Comparator.comparing(Poster::getStartDate).reversed()))
                    .collect(Collectors.toList()));
    CompletableFuture<List<Poster>> afterPosters =
        posterService
            .getPosters()
            .thenApply(
                posters ->
                    posters.stream()
                        .filter(poster -> poster.getStartDate().isAfter(LocalDateTime.now()))
                        .sorted(Comparator.nullsLast(Comparator.comparing(Poster::getStartDate)))
                        .collect(Collectors.toList()));
    CompletableFuture<List<Poster>> allPosters =
        afterPosters.thenCombine(
            beforePosters,
            (list1, list2) -> {
              list1.addAll(list2);
              return list1;
            });
    return allPosters;
  }

  //
  //    @PutMapping("/update/{id}")
  //    public CompletableFuture<ServiceResponse<Poster>> updatePoster(String id, Poster
  // updatedPoster) {
  //        return getPosterById(id)
  //                .thenCompose(existingPosterResponse -> {
  //                    Poster existingPoster = existingPosterResponse.getData();
  //                    if (existingPoster != null) {
  //                        // Exclude ID and content from the update
  //                        existingPoster.setTitle(updatedPoster.getTitle());
  //                        existingPoster.setDescription(updatedPoster.getDescription());
  //                        existingPoster.setTags(updatedPoster.getTags());
  //                        existingPoster.setIsRecurring(updatedPoster.getIsRecurring());
  //
  //                        return CompletableFuture.completedFuture(existingPoster);
  //                    } else {
  //                        return CompletableFuture.completedFuture(null);
  //                    }
  //                })
  //                .thenCompose(updated -> {
  //                    if (updated != null) {
  //                        return CompletableFuture.completedFuture(
  //                                posterRepository.save(updated)
  //                        );
  //                    } else {
  //                        return CompletableFuture.completedFuture(null);
  //                    }
  //                })
  //                .thenApply(updated -> {
  //                    if (updated != null) {
  //                        return new ServiceResponse<>(updated, "Poster updated");
  //                    }
  //                    return new ServiceResponse<>("Failed to update poster");
  //
  //                });
  //
  //    }

}