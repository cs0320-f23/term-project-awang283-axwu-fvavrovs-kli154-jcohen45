//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package edu.brown.cs.student.main.imgur;

import edu.brown.cs.student.main.responses.ServiceResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImgurService {
    @Value("${imgur.clientId}")
    private String clientId;

    @Autowired
    public ImgurService() {
    }

    public ServiceResponse<String> uploadToImgur(MultipartFile file) {
        try {
            if (!file.isEmpty()) {
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Client-ID " + this.clientId);
                headers.setContentType(MediaType.MULTIPART_FORM_DATA);
                byte[] imageBytes = file.getBytes();
                HttpEntity<byte[]> requestEntity = new HttpEntity(imageBytes, headers);
                ResponseEntity<ImgurApiResponse> responseEntity = restTemplate.exchange("https://api.imgur.com/3/image", HttpMethod.POST, requestEntity, ImgurApiResponse.class, new Object[0]);
                if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
                    String imgurLink = ((ImgurApiResponse)responseEntity.getBody()).getData().getLink();
                    System.out.println("Image uploaded, link: " + imgurLink);
                    return new ServiceResponse(imgurLink, "Image uploaded successfully");
                } else {
                    System.err.println("Image upload failed. Status code: " + responseEntity.getStatusCode());
                    return new ServiceResponse("Failed to upload image");
                }
            } else {
                return new ServiceResponse("Please select a file to upload!");
            }
        } catch (IOException var8) {
            var8.printStackTrace();
            return new ServiceResponse("Error uploading image");
        }
    }
}
