package edu.brown.cs.student.main.imgur;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.brown.cs.student.main.responses.ServiceResponse;
import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImgurService {
  @Value("${imgur.clientId}")
  private String clientId;

  @Autowired
  public ImgurService() {}

  public ServiceResponse<String> uploadToImgur(MultipartFile file) {
    ServiceResponse<String> response = new ServiceResponse<>("hi");

    try {
      if (!file.isEmpty()) {
        // Create headers with Imgur client ID
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + "64d54d2c2fc9bcd");
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Create form data containing the file
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new HttpEntity<>(file.getBytes(), headers));

        // Create HttpEntity with the form data and headers
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Create RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();

        // Send POST request to Imgur API
        ResponseEntity<String> res =
            restTemplate.exchange(
                "https://api.imgur.com/3/image", HttpMethod.POST, requestEntity, String.class);
        System.out.println("AFTER API CALL JKDFHSJLKDHAFLASF");
        if (res.hasBody()) {
          String responseBody = res.getBody();
          ObjectMapper objectMapper = new ObjectMapper();
          try {
            Map<String, Object> imgurResponse =
                objectMapper.readValue(responseBody, new TypeReference<Map<String, Object>>() {});
            Map<String, Object> data = (Map<String, Object>) imgurResponse.get("data");
            String link = (String) data.get("link");
            System.out.println("Link: " + link);
            response.setData(link);
            response.setMessage("Upload successful");
          } catch (Exception e) {
            e.printStackTrace();
          }

          // Set the Imgur link in the response object

          // response.setSuccess(true);
        } else {
          response.setMessage("Please select a file to upload!");
          // response.setSuccess(false);
        }
      }
    } catch (IOException e) {
      // Handle any exceptions
      System.out.println("in the catch block IOException");
      response.setMessage("Error uploading image: " + e.getMessage());
      // response.setSuccess(false);
    }

    return response;
  }
}
