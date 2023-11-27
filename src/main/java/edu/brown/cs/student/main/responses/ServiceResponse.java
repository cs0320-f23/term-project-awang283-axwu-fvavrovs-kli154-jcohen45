package edu.brown.cs.student.main.responses;

import edu.brown.cs.student.main.types.Poster;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceResponse<T> {
    private String message;
    private T data;

    public ServiceResponse(String message) {
        this.message = message;
    }

    public ServiceResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public ServiceResponse(Poster poster, String message) {
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    // Setters if needed (for completeness and if used for deserialization)
    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }
}