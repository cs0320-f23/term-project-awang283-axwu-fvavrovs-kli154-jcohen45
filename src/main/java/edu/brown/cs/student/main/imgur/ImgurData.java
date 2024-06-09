package edu.brown.cs.student.main.imgur;

public class ImgurData {
  private String id;
  private String title;
  private String description;
  private String type;
  private boolean animated;
  private int width;
  private int height;
  private int size;
  private int views;
  private int bandwidth;
  private String link;

  // Getters and setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public boolean isAnimated() {
    return animated;
  }

  public void setAnimated(boolean animated) {
    this.animated = animated;
  }

  public int getWidth() {
    return width;
  }

  public void setWidth(int width) {
    this.width = width;
  }

  public int getHeight() {
    return height;
  }

  public void setHeight(int height) {
    this.height = height;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }

  public int getViews() {
    return views;
  }

  public void setViews(int views) {
    this.views = views;
  }

  public int getBandwidth() {
    return bandwidth;
  }

  public void setBandwidth(int bandwidth) {
    this.bandwidth = bandwidth;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  @Override
  public String toString() {
    return "ImgurData{"
        + "id='"
        + id
        + '\''
        + ", title='"
        + title
        + '\''
        + ", description='"
        + description
        + '\''
        + ", type='"
        + type
        + '\''
        + ", animated="
        + animated
        + ", width="
        + width
        + ", height="
        + height
        + ", size="
        + size
        + ", views="
        + views
        + ", bandwidth="
        + bandwidth
        + ", link='"
        + link
        + '\''
        + '}';
  }
}
