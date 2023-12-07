//package edu.brown.cs.student.main.imgur;
//
//import edu.brown.cs.student.main.imgur.ImgurApiResponse;
//import edu.brown.cs.student.main.responses.ServiceResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//@Service
//public class ImgurService {
//
//    @Autowired
//    public ImgurService(){}
//    @Value("${imgur.clientId}")
//    private String clientId; // Inject Imgur Client ID from application.properties
//
//    public ServiceResponse<String> uploadToImgur(String imagePath) {
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("Authorization", "Client-ID " + clientId);
//            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//            Path path = Paths.get(imagePath);
//            byte[] imageBytes = Files.readAllBytes(path);
//
//            HttpEntity<byte[]> requestEntity = new HttpEntity<>(imageBytes, headers);
//            ResponseEntity<ImgurApiResponse> responseEntity = restTemplate.exchange(
//                    "https://api.imgur.com/3/image",
//                    HttpMethod.POST,
//                    requestEntity,
//                    ImgurApiResponse.class
//            );
//
//            if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
//                String imgurLink = responseEntity.getBody().getData().getLink();
//                System.out.println("Image uploaded, link: " + imgurLink);
//                return new ServiceResponse<>(imgurLink, "Image uploaded successfully");
//            } else {
//                System.err.println("Image upload failed. Status code: " + responseEntity.getStatusCode());
//                return new ServiceResponse<>("Failed to upload image");
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//            return new ServiceResponse<>("Error uploading image");
//        }
//    }
//}
