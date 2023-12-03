package edu.brown.cs.student.main;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ImgurCallbackController {
    private final String clientId = "YOUR_IMGUR_CLIENT_ID";
    private final String clientSecret = "YOUR_IMGUR_CLIENT_SECRET";
    private final String redirectUri = "http://localhost:8080/oauth2/callback"; // Should match the one registered with Imgur

    @GetMapping("/oauth2/callback")
    public ResponseEntity<String> imgurCallback(@RequestParam("code") String code) {
        // Handle the callback logic
        // Extract the authorization code from the query parameters (code parameter)

        // Exchange authorization code for access token with Imgur
        String accessToken = exchangeAuthorizationCodeForAccessToken(code);

        // Perform any additional logic (e.g., store the access token, authenticate the user)

        // Redirect or return a response based on your application's requirements
        return ResponseEntity.ok("Imgur authorization successful! Access Token: " + accessToken);
    }

    private String exchangeAuthorizationCodeForAccessToken(String code) {
        // Make a request to Imgur's token endpoint to exchange the authorization code for an access token

        String tokenEndpoint = "https://api.imgur.com/oauth2/token";
        RestTemplate restTemplate = new RestTemplate();

        // Set up the request parameters
        Map<String, String> params = new HashMap<>();
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("grant_type", "authorization_code");
        params.put("code", code);
        params.put("redirect_uri", redirectUri);

        // Make the request and parse the response
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenEndpoint, params, Map.class);
        Map<String, Object> responseBody = response.getBody();

        // Extract the access token from the response
        if (responseBody != null && responseBody.containsKey("access_token")) {
            return responseBody.get("access_token").toString();
        } else {
            throw new RuntimeException("Failed to exchange authorization code for access token");
        }
    }
}
