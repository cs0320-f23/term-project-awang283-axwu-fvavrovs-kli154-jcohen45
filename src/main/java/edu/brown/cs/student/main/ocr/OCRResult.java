package edu.brown.cs.student.main.ocr;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)

public class OCRResult {
    @JsonProperty("ParsedResults")
    private List<ParsedResult> ParsedResults;
    @JsonProperty("OCRExitCode")
    private int OCRExitCode;
    @JsonProperty("IsErroredOnProcessing")
    private boolean IsErroredOnProcessing;
    @JsonProperty("ProcessingTimeInMilliseconds")
    private String ProcessingTimeInMilliseconds;
    @JsonProperty("SearchablePDFURL")
    private String SearchablePDFURL;

    public List<ParsedResult> getParsedResults() {
        return this.ParsedResults;
    }

    public void setParsedResults(List<ParsedResult> parsedResults) {
        this.ParsedResults = parsedResults;
    }

    public int getOCRExitCode() {
        return this.OCRExitCode;
    }

    public void setOCRExitCode(int OCRExitCode) {
        this.OCRExitCode = OCRExitCode;
    }

    public boolean isErroredOnProcessing() {
        return this.IsErroredOnProcessing;
    }

    public void setErroredOnProcessing(boolean erroredOnProcessing) {
        this.IsErroredOnProcessing = erroredOnProcessing;
    }

    public String getProcessingTimeInMilliseconds() {
        return this.ProcessingTimeInMilliseconds;
    }

    public void setProcessingTimeInMilliseconds(String processingTimeInMilliseconds) {
        this.ProcessingTimeInMilliseconds = processingTimeInMilliseconds;
    }

    public String getSearchablePDFURL() {
        return this.SearchablePDFURL;
    }

    public void setSearchablePDFURL(String searchablePDFURL) {
        this.SearchablePDFURL = searchablePDFURL;
    }

}

@JsonIgnoreProperties(ignoreUnknown = true)
class ParsedResult {
    @JsonProperty("TextOverlay")

    private TextOverlay TextOverlay;
    @JsonProperty("FileParseExitCode")
    private int FileParseExitCode;
    @JsonProperty("ParsedText")

    private String ParsedText;

    public TextOverlay getTextOverlay() {
        return this.TextOverlay;
    }

    public void setTextOverlay(TextOverlay textOverlay) {
        this.TextOverlay = textOverlay;
    }

    public int getFileParseExitCode() {
        return this.FileParseExitCode;
    }

    public void setFileParseExitCode(int fileParseExitCode) {
        this.FileParseExitCode = fileParseExitCode;
    }

    public String getParsedText() {
        return this.ParsedText;
    }

    public void setParsedText(String parsedText) {
        this.ParsedText = parsedText;
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
class TextOverlay {
    @JsonProperty("Lines")
    private List<Line> Lines;
    @JsonProperty("HasOverlay")
    private boolean HasOverlay;
    @JsonProperty("Message")
    private String Message;

    public List<Line> getLines() {
        return this.Lines;
    }

    public void setLines(List<Line> lines) {
        this.Lines = lines;
    }

    public boolean isHasOverlay() {
        return this.HasOverlay;
    }

    public void setHasOverlay(boolean hasOverlay) {
        this.HasOverlay = hasOverlay;
    }

    public String getMessage() {
        return this.Message;
    }

    public void setMessage(String message) {
        this.Message = message;
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
class Line {
    @JsonProperty("LineText")
    private String LineText;
    @JsonProperty("Words")
    private List<Word> Words;
    @JsonProperty("MaxHeight")
    private double MaxHeight;
    @JsonProperty("MinTop")
    private double MinTop;

    public String getLineText() {
        return this.LineText;
    }

    public void setLineText(String lineText) {
        this.LineText = lineText;
    }

    public List<Word> getWords() {
        return this.Words;
    }

    public void setWords(List<Word> words) {
        this.Words = words;
    }

    public double getMaxHeight() {
        return this.MaxHeight;
    }

    public void setMaxHeight(double maxHeight) {
        this.MaxHeight = maxHeight;
    }

    public double getMinTop() {
        return this.MinTop;
    }

    public void setMinTop(double minTop) {
        this.MinTop = minTop;
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
class Word {
    @JsonProperty("WordText")
    private String WordText;
    @JsonProperty("Left")
    private double Left;
    @JsonProperty("Top")
    private double Top;
    @JsonProperty("Height")
    private double Height;
    @JsonProperty("Width")
    private double Width;

    public String getWordText() {
        return this.WordText;
    }

    public void setWordText(String wordText) {
        this.WordText = wordText;
    }

    public double getLeft() {
        return this.Left;
    }

    public void setLeft(double left) {
        this.Left = left;
    }

    public double getTop() {
        return this.Top;
    }

    public void setTop(double top) {
        this.Top = top;
    }

    public double getHeight() {
        return this.Height;
    }

    public void setHeight(double height) {
        this.Height = height;
    }

    public double getWidth() {
        return this.Width;
    }

    public void setWidth(double width) {
        this.Width = width;
    }
}

