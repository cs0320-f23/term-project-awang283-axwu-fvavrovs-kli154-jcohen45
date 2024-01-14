// package edu.brown.cs.student.main;
//
//
// import org.springframework.stereotype.Component;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//
// @Component
// public class CorsFilter{
//    public CorsFilter corsFilter(){
//
//        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config=new CorsConfiguration();
//        //config.setAllowCredentials(true); // you USUALLY want this
//        config.addAllowedOrigin("*");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("OPTIONS");
//        config.addAllowedMethod("HEAD");
//        config.addAllowedMethod("GET");
//        config.addAllowedMethod("PUT");
//        config.addAllowedMethod("POST");
//        config.addAllowedMethod("DELETE");
//        config.addAllowedMethod("PATCH");
//        source.registerCorsConfiguration("/**",config);
//        return new CorsFilter(source);
//        }
//        }
