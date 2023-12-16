package edu.brown.cs.student.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class App {
  public static void main(String[] args) throws Exception {
    SpringApplication.run(App.class, args);
  }
}
