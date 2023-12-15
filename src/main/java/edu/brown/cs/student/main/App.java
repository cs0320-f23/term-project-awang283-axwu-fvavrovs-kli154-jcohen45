package edu.brown.cs.student.main;

import edu.brown.cs.student.main.ocr.OCRAsyncTask;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class App {
  public static void main(String[] args) throws Exception {

    String a = "https://i.imgur.com/ArJTBeX.jpg"; // women's history month
    String b = "https://i.imgur.com/uyZdCi8.png"; // language lab

    SpringApplication.run(App.class, args);

    OCRAsyncTask task = new OCRAsyncTask();
    task.sendPost("K85630038588957", true, "https://i.imgur.com/mcK8FVr.png", "eng");
  }
}
