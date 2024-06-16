package edu.brown.cs.student.main.ocr;

import java.util.HashMap;
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
    System.out.println("start of send post");

    OCRParser parser = new OCRParser();
    Resource resource = this.resourceLoader.getResource(imageUrl);
    System.out.println("resource " + resource);
    String textFromImage =
        this.cloudVisionTemplate.extractTextFromImage(resource);

    System.out.println("Result: " + ("Text from image: " + textFromImage));

    return new HashMap();
  }
}
