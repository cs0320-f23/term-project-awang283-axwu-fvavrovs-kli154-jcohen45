package edu.brown.cs.student.main.ocr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import com.google.cloud.vision.v1.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

@Service
public class OCRAsyncTask {
  @Autowired private CloudVisionTemplate cloudVisionTemplate;

  @Autowired private ResourceLoader resourceLoader;

  public HashMap sendPost(String imageUrl) throws Exception {

    GCVParser parser = new GCVParser();

    List<AnnotateImageRequest> requests = new ArrayList<>();

    //build image from url
    Image img = Image.newBuilder().setSource(ImageSource.newBuilder().setImageUri(imageUrl)).build();
    Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();

    AnnotateImageRequest request =
            AnnotateImageRequest.newBuilder()
                    .addFeatures(feat)
                    .setImage(img)
                    .build();

    requests.add(request);

    // Initialize the client
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      // Send the batch request
      BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);

      // Process the responses
      List<AnnotateImageResponse> responses = response.getResponsesList();
      for (AnnotateImageResponse res : responses) {
        if (res.hasError()) {
          System.out.println("error " + res.getError().getMessage());
          return new HashMap<>();
        }


        // important stuff after here

        if (!res.getTextAnnotationsList().isEmpty()){ // this if statement will only be true if text was detected
          String textFromImage = res.getTextAnnotationsList().get(0).getDescription();
          System.out.println(res.getTextAnnotationsList().get(0).getDescription());
          HashMap suggestedFields = parser.parseResult(textFromImage);

          // Print detected text and its bounding polygon; the one at index 0 is just the whole thing
          for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
            System.out.println("Text: %s%n" + annotation.getDescription());
            System.out.println("Position : %s%n" + annotation.getBoundingPoly());
          }

          return suggestedFields;
        }




      }
    }

    return new HashMap(); // to be replaced with suggested fields
  }


}
