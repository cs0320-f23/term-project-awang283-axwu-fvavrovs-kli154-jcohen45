package edu.brown.cs.student.main;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class MediaConverterConfiguration implements WebMvcConfigurer {
  @Bean
  public MappingJackson2HttpMessageConverter jacksonConverter() {
    MappingJackson2HttpMessageConverter mc = new MappingJackson2HttpMessageConverter();
    List<MediaType> supportedMediaTypes = new ArrayList<>(mc.getSupportedMediaTypes());
    supportedMediaTypes.add(MediaType.valueOf(MediaType.APPLICATION_JSON_VALUE));
    supportedMediaTypes.add(MediaType.valueOf("application/vnd.spring-boot.actuator.v2+json"));
    mc.setSupportedMediaTypes(supportedMediaTypes);
    return mc;
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    converters.add(jacksonConverter());
  }
}
