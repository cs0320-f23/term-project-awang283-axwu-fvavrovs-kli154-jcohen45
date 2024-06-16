package edu.brown.cs.student.main.ocr;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;

public class OCRAsyncTask {
  @Autowired private CloudVisionTemplate cloudVisionTemplate;

  @Autowired private ResourceLoader resourceLoader;

  public HashMap sendPost(String imageUrl) throws Exception {

    OCRParser parser = new OCRParser();
    String textFromImage =
        this.cloudVisionTemplate.extractTextFromImage(this.resourceLoader.getResource(imageUrl));

    System.out.println("Result: " + ("Text from image: " + textFromImage));

    return parser.deserialize(String.valueOf(textFromImage));
  }
}
