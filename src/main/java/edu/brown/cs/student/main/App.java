package edu.brown.cs.student.main;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.brown.cs.student.main.types.Poster;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class App {
  public static void main(String[] args) {

    SpringApplication.run(App.class, args);
    Poster instance = new Poster();
    instance.setContent("hi");

    // Initialize ObjectMapper
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      // Serialize the instance to JSON
      String json = objectMapper.writeValueAsString(instance);

      // Print the JSON representation
      System.out.println("JSON representation:");
      System.out.println(json);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }
}
