package edu.brown.cs.student.main.ocr;

import com.google.cloud.vision.v1.EntityAnnotation;
import edu.brown.cs.student.main.BMSearch;
import edu.brown.cs.student.main.Tags;
import java.time.LocalDateTime;
import java.util.*;

public class GCVParser {

  public HashMap parseResult(List<EntityAnnotation> result) {
    String title = this.extractTitle(result);
    String description = result.get(0).getDescription().replace("\n", " ");
    String[] words = description.split(" ");
    String link = this.extractLink(words);
    HashSet<String> tags = this.extractTags(words);

    System.out.println("Title: " + title);
    System.out.println("Description: " + description);
    System.out.println("Link: " + link);
    System.out.println("Tags: " + tags);

    HashMap suggestedFields = new HashMap();
    LocalDateTime defaultStart = LocalDateTime.now();

    suggestedFields.put("title", title);
    suggestedFields.put("description", description);
    suggestedFields.put("link", link);
    suggestedFields.put("tags", tags);
    suggestedFields.put("startDate", defaultStart);
    return suggestedFields;
  }
  /**
   * Determines title based on the largest text (height variable)
   *
   * @param lines
   * @return
   */
  private String extractTitle(List<EntityAnnotation> lines) {
    String title = "";
    double max = -1;
    int maxIndex = 0;
    // finds the tallest word
    for (int i = 1; i < lines.size(); i++) {
      int height = this.getHeight(lines.get(i));
      if (height > max) {
        max = height;
        maxIndex = i;
      }
    }

    // also finds words of similar heights bc sometimes the parsing isn't exact but they're visually
    // the same
    for (int i = 1; i < lines.size(); i++) {
      double compHeight = this.getHeight(lines.get(i));
      double percentDiff = Math.abs((max - compHeight) / compHeight);
      if (percentDiff < 0.6) {
        title += lines.get(i).getDescription() + " ";
      }
    }

    return title;
  }

  private int getHeight(EntityAnnotation line) {
    int top = line.getBoundingPoly().getVertices(0).getY();
    int bottom = line.getBoundingPoly().getVertices(3).getY();
    return bottom - top;
  }

  private String extractLink(String[] words) {
    HashSet<String> indicators =
        new HashSet<>(
            Arrays.asList(
                "http",
                "https",
                " com",
                " org",
                " net",
                " edu",
                " gov",
                "www",
                "tinyurl",
                "bitly",
                "formsgle"));
    for (String word : words) {
      for (String webWord : indicators) {
        if (word.contains("tinyurlcom")) {
          return word.replace("tinyurlcom", "tinyurl.com");
        }
        if (word.contains("formsgle")) {
          return word.replace("formsgle", "forms.gle");
        }
        if (word.contains("bitly")) {
          return word.replace("bitly", "bit.ly");
        }
        if (word.contains(webWord)) {
          return word;
        }
      }
    }
    return null;
  }

  private HashSet<String> extractTags(String[] words) {
    BMSearch searcher = new BMSearch();
    Tags tagObj = new Tags();
    HashMap<String, List<String>> tags = tagObj.getJumboTags();
    HashSet<String> toReturn = new HashSet<>();

    for (String word : words) {
      if (word.length() > 2) {
        for (String tag : tags.keySet()) {
          List<String> tagLine = tags.get(tag);
          for (String tagWord : tagLine) {
            if (word.toLowerCase().contains(tagWord)) {
              toReturn.add(tag);
              break;
            }
          }
        }
      }
    }

    return toReturn;
  }
}
