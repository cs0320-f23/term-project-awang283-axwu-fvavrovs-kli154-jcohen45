package edu.brown.cs.student.main;

import edu.brown.cs.student.main.ocr.OCRAsyncTask;
import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Draft;
import edu.brown.cs.student.main.types.Poster;
import edu.brown.cs.student.main.user.User;
import edu.brown.cs.student.main.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class DraftService {

    private final DraftRepository draftRepository;

    private final UserService userService;

    @Autowired
    public DraftService(DraftRepository draftRepository, UserService userService) {
        this.draftRepository = draftRepository;
        this.userService = userService;
    }

    public CompletableFuture<ServiceResponse<Draft>> getDraftById(String id) {
        return this.getDrafts()
                .thenCompose(
                        posters ->
                                posters.stream()
                                        .filter(poster -> id.equals(poster.getID()))
                                        .findFirst()
                                        .map(
                                                poster ->
                                                        CompletableFuture.completedFuture(
                                                                new ServiceResponse<Draft>(poster, "poster with id found")))
                                        .orElseGet(
                                                () ->
                                                        CompletableFuture.completedFuture(
                                                                new ServiceResponse<Draft>("Poster not found"))));
    }

    @Async
    public CompletableFuture<List<Draft>> getDrafts(){
        return CompletableFuture.completedFuture(draftRepository.findAll());
    }

    public ServiceResponse<Draft> createDraft(Draft poster, String userID) {
        ServiceResponse<Draft> response;
        // Associate the poster with the user
        CompletableFuture<ServiceResponse<User>> associateResponse =
                userService.associatePosterWithUser(userID, poster);

        try {
            associateResponse.get(); // Wait for the completion of the asynchronous task
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error: " + e.getMessage());
        }

        if (!associateResponse.isCompletedExceptionally()) {
            System.out.println(associateResponse);
            System.out.println("associateResponse.isCompletedExceptionally() == false");
            // Save the Poster object to the database
            try {
                OCRAsyncTask task = new OCRAsyncTask();
                HashMap suggestedFields =
                        task.sendPost("K85630038588957", true, poster.getContent(), "eng");
                poster.setTitle((String) suggestedFields.get("title"));
                poster.setDescription((String) suggestedFields.get("description"));
                poster.setLink((String) suggestedFields.get("link"));
                poster.setTags((HashSet<String>) suggestedFields.get("tags"));
                poster.setStartDate((LocalDateTime) suggestedFields.get("startDate"));

                //      suggestedFields.setID(poster.getID());
                //      this.updatePoster(suggestedFields);
            } catch (Exception e) {
                System.err.println("Error reading text on image file: " + e.getMessage());
            }

            if (poster.isPoster()) {
                if (draftRepository
                        .findById(poster.getID())
                        .isEmpty()) { // check if already exists in database
                    System.out.println("Saving to mongo now");
                    Draft savedPoster = draftRepository.insert(poster);
                    // Create a response object
                    response = new ServiceResponse<>(savedPoster, "added to database");
                } else {
                    System.out.println("Saving to mongo now");
                    Draft savedPoster = draftRepository.save(poster);
                    // Create a response object
                    response = new ServiceResponse<>(savedPoster, "saved to database");
                }
            } else {
                response = new ServiceResponse<>(poster, "not added to database");
            }
            //  }
            response = new ServiceResponse<>(poster, "not added to database");
            // CompletableFuture is basically a Promise
            return (response);
        }

        return (new ServiceResponse<>(poster, "Invalid user ID provided"));
    }

    @Async
    public void deleteAll() {
        this.draftRepository.deleteAll();
    }

    @Async
    public CompletableFuture<ServiceResponse<Draft>> updateDraft(Draft updatedDraft) {
        if (updatedDraft != null) {
            return this.getDraftById(updatedDraft.getID())
                    .thenApply(
                            oldPosterResponse -> {
                                Draft oldPoster = oldPosterResponse.getData();
                                if (oldPoster != null) {
                                    if (updatedDraft.getStartDate() != null)
                                        oldPoster.setStartDate(updatedDraft.getStartDate());
                                    if (updatedDraft.getEndDate() != null)
                                        oldPoster.setEndDate(updatedDraft.getEndDate());
                                    oldPoster.setIsRecurring(updatedDraft.getIsRecurring());
                                    if (updatedDraft.getTitle() != null)
                                        oldPoster.setTitle((updatedDraft.getTitle()));
                                    if (updatedDraft.getDescription() != null)
                                        oldPoster.setDescription(updatedDraft.getDescription());
                                    if (updatedDraft.getLocation() != null)
                                        oldPoster.setLocation(updatedDraft.getLocation());
                                    if (updatedDraft.getLink() != null) oldPoster.setLink(updatedDraft.getLink());
                                    if (updatedDraft.getTags() != null) oldPoster.setTags(updatedDraft.getTags());
                                    draftRepository.save(oldPoster);
                                    return new ServiceResponse<>(oldPoster, "Poster updated");
                                } else {
                                    return new ServiceResponse<>("Failed to update poster - Poster not found");
                                }
                            });
        } else {
            return CompletableFuture.completedFuture(
                    new ServiceResponse<>("Failed to update poster - Invalid data"));
        }
    }

    @Async
    public CompletableFuture<ServiceResponse<String>> deletePosterById(String id) {
        Optional<Draft> posterToDelete = draftRepository.findById(id);

        if (posterToDelete.isPresent()) {
            draftRepository.deleteById(id);
            return CompletableFuture.completedFuture(new ServiceResponse<>("Poster deleted"));
        } else {
            return CompletableFuture.completedFuture(new ServiceResponse<>("Poster not found"));
        }
    }
}
