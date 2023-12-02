package edu.brown.cs.student.test;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertNotNull;

import edu.brown.cs.student.main.PosterController;
import edu.brown.cs.student.main.PosterService;
import edu.brown.cs.student.main.responses.ServiceResponse;
import edu.brown.cs.student.main.types.Poster;
import java.util.concurrent.CompletableFuture;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testng.Assert;

@ExtendWith(MockitoExtension.class)
class PosterManagementUnitTest {
    @Mock private PosterService posterService;

    @InjectMocks private PosterController posterController;

    @Test
    public void testUpdatePoster() {
        // Mock data
        String id = "123";
        Poster updatedPoster = new Poster("id", "title", "description");

        // Mock behavior
        when(posterService.getPosterById(id))
                .thenReturn(
                        CompletableFuture.completedFuture(
                                new ServiceResponse<>(updatedPoster, "add updated vals")));
        when(posterService.updatePoster(updatedPoster))
                .thenReturn(
                        CompletableFuture.completedFuture(
                                new ServiceResponse<>(updatedPoster, "Poster updated")));

        // Perform test (relies on mock behavior)
        CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> result =
                posterController.updatePoster(id, updatedPoster);

        assertNotNull(result);
    }

    @Test
    public void testGetPoster() {
        // Mock data
        String id = "123";
        Poster mockPoster = new Poster("id", "title", "description");

        // Mock behavior
        when(posterService.getPosterById(id))
                .thenReturn(
                        CompletableFuture.completedFuture(
                                new ServiceResponse<>(mockPoster, "success")));
        // Perform test (relies on mock behavior)
        CompletableFuture<ResponseEntity<ServiceResponse<Poster>>> result =
                posterController.getPosterById(id);

        assertNotNull(result);
//        assertDoesNotThrow(() -> {
//            ResponseEntity<ServiceResponse<Poster>> body = result.join();
//            assertNotNull(body);
//        });

        // can write further assertions about body (ResponseEntity object) if desired
        ResponseEntity<ServiceResponse<Poster>> body = result.join();

    }

}