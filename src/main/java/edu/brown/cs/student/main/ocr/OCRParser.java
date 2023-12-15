package edu.brown.cs.student.main.ocr;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.brown.cs.student.main.BMSearch;
import edu.brown.cs.student.main.PosterController;
import edu.brown.cs.student.main.PosterService;
import edu.brown.cs.student.main.Tags;
import edu.brown.cs.student.main.types.Poster;

import java.util.*;

public class OCRParser {

    public Poster parseResult(List<ParsedResult> result){
        List<Line> lines = result.get(0).getTextOverlay().getLines();

        String title = this.extractTitle(lines);
        String description = result.get(0).getParsedText().replace("\r\n", " ");
        String[] words = description.split(" ");
        String link = this.extractLink(words);
        HashSet<String> tags = this.extractTags(words);

        System.out.println("Title: " + title);
        System.out.println("Description: " + description);
        System.out.println("Link: " + link);
        System.out.println("Tags: " + tags);

        Poster suggestedPoster = new Poster(title, description);
        suggestedPoster.setLink(link);
        suggestedPoster.setTags(tags);
        return suggestedPoster;
    }



    public void deserialize(String json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        OCRResult ocrResult = objectMapper.readValue(json, OCRResult.class);

        List<ParsedResult> parsedResults = ocrResult.getParsedResults();

        this.parseResult(parsedResults);
    }

    /**
     * Determines title based on the largest text (height variable)
     * @param lines
     * @return
     */

    private String extractTitle(List<Line> lines) {
        String title = "";
        double max = -1;
        int maxIndex = 0;
        // finds the tallest word
        for (int i = 0; i < lines.size(); i++){
            if (lines.get(i).getMaxHeight() > max){
                max = lines.get(i).getMaxHeight();
                maxIndex = i;
            }
        }

        // also finds words of similar heights bc sometimes the parsing isn't exact but they're visually the same
        for (Line line : lines){
            double compHeight = line.getMaxHeight();
            double percentDiff = Math.abs((max - compHeight)/compHeight);
            if (percentDiff < 0.4){
                title += line.getLineText() + " ";
            }
        }

        return title;
    }

    private String extractLink(String[] words) {
        HashSet<String> indicators = new HashSet<>(Arrays.asList("http", "https", " com"," org"," net"," edu"," gov",
                "www", "tinyurl", "bitly"));
        for (String word : words){
            for (String webWord : indicators){
                if (word.contains("tinyurlcom")){
                    return word.replace("tinyurlcom","tinyurl.com");
                }
                if (word.contains("bitly")){
                    return word.replace("bitly","bit.ly");
                }
                if (word.contains(webWord)){
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

        for (String word : words){
            if (word.length() > 2){
                for (String tag : tags.keySet()){
                    List<String> tagLine = tags.get(tag);
                    for (String tagWord : tagLine){
                        if (word.toLowerCase().contains(tagWord)){
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
