package edu.brown.cs.student.main.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.brown.cs.student.main.types.Poster;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceResponse<T> {
  /**
   * This class handles responses to API requests
   */
  private String message;
  private T data; // generic so it can be used with endpoints not related to poster management

  /**
   * Message only constructor (used mainly for errors, since no data is returned)
   * @param message
   */
  public ServiceResponse(String message) {
    this.message = message;
  }

  /**
   * Message and data constructor (used mainly for successes, since data, e.g. a poster, is returned)
   * @param message
   */
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
