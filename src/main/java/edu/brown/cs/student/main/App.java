package edu.brown.cs.student.main;

import edu.brown.cs.student.main.ocr.OCRAsyncTask;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class App {
  public static void main(String[] args) throws Exception {

    SpringApplication.run(App.class, args);

    OCRAsyncTask task = new OCRAsyncTask();
    task.sendPost("K85630038588957", true, "https://i.imgur.com/ArJTBeX.jpg", "eng");
  }
}
