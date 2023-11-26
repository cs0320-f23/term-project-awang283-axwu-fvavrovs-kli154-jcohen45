package edu.brown.cs.student.main.responses;

import edu.brown.cs.student.main.types.Poster;

public class ServiceResponse<T> {
    private String message;
    private T data; //idk what to do with this tbh

    public ServiceResponse(Poster poster, String message) {
        this.message = message;
        System.out.println(message + ": " + poster.getTitle());

    }
    public ServiceResponse(String message) {
        this.message = message;
        System.out.println(message);

    }


}
