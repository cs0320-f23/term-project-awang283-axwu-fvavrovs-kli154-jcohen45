package edu.brown.cs.student.main.ocr;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.brown.cs.student.main.types.Poster;

import java.util.List;

public class OCRParser {

    public Poster parseResult(String result){
        String title = this.extractTitle(result);
        return new Poster();

    }

    public void deserialize(String json) throws JsonProcessingException {

        // Create ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize JSON to Java objects
        OCRResult ocrResult = objectMapper.readValue(json, OCRResult.class);

        // Access the deserialized objects
        List<ParsedResult> ParsedResults = ocrResult.getParsedResults();
        // Access other fields as needed

        System.out.println(ParsedResults);
    }

    private String extractTitle(String result) {
        return "";
    }

}
