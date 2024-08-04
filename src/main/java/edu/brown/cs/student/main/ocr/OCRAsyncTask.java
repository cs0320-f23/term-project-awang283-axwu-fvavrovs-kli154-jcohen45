package edu.brown.cs.student.main.ocr;

import com.google.cloud.vision.v1.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

@Service
public class OCRAsyncTask {
  @Autowired private CloudVisionTemplate cloudVisionTemplate;

  @Autowired private ResourceLoader resourceLoader;

  public HashMap sendPost(String imageUrl) throws Exception {

    GCVParser parser = new GCVParser();

    List<AnnotateImageRequest> requests = new ArrayList<>();

    // build image from url
    Image img =
        Image.newBuilder().setSource(ImageSource.newBuilder().setImageUri(imageUrl)).build();
    Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();

    AnnotateImageRequest request =
        AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();

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

        if (!res.getTextAnnotationsList()
            .isEmpty()) { // this if statement will only be true if text was detected
          List<EntityAnnotation> toParse = res.getTextAnnotationsList();
          HashMap suggestedFields = parser.parseResult(toParse);

          return suggestedFields;
        }
      }
    }

    return new HashMap(); // to be replaced with suggested fields
  }
}
