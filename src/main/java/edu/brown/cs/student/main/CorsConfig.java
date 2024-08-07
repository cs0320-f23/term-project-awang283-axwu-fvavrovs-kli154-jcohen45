package edu.brown.cs.student.main;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/users/create") // Map specific endpoint
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);

        registry
            .addMapping("/users/{id}")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*") // Allow any headers
            .allowCredentials(true);
        registry
            .addMapping("/users/savedPosters/{id}")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET") // Adjust allowed methods based on your needs
            .allowedHeaders("*") // Allow any headers
            .allowCredentials(true)
            .maxAge(3600);
        registry
            .addMapping("/users/createdPosters/{id}")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET") // Adjust allowed methods based on your needs
            .allowedHeaders("*") // Allow any headers
            .allowCredentials(true)
            .maxAge(3600);
        registry
            .addMapping("/users/update/{id}")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*") // Allow any headers
            .allowCredentials(true);
        registry
            .addMapping("/posters/create/{id}")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("POST", "PUT")
            .allowedHeaders("*")
            .allowCredentials(true);
        registry
            .addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
      }
    };
  }
}
