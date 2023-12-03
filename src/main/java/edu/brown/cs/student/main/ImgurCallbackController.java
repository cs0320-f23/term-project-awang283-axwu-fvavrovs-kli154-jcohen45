package edu.brown.cs.student.main;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImgurCallbackController {

    @GetMapping("/oauth2/callback")
    public ResponseEntity<String> imgurCallback(@RequestParam("code") String code) {
        // Handle the callback logic
        // Extract the authorization code from the query parameters (code parameter)

        // Perform any additional logic (e.g., exchange the code for an access token)

        // Redirect or return a response based on your application's requirements
        return ResponseEntity.ok("Imgur authorization successful! Code: " + code);
    }
}
