package edu.brown.cs.student.main.responses;

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

  public ServiceResponse(T data, String message) {
    this.data = data;
    this.message = message;
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
