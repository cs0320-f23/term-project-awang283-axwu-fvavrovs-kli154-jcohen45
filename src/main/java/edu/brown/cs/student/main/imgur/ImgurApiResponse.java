package edu.brown.cs.student.main.imgur;
public class ImgurApiResponse {
  private boolean success;
  private int status;
  private ImgurData data;

  // Getters and setters
  public boolean isSuccess() {
    return success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public ImgurData getData() {
    return data;
  }

  public void setData(ImgurData data) {
    this.data = data;
  }

  @Override
  public String toString() {
    return "ImgurApiResponse{" +
            "success=" + success +
            ", status=" + status +
            ", data=" + data +
            '}';
  }
}