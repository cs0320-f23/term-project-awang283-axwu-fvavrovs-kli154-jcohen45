package edu.brown.cs.student.main.ocr;

import com.fasterxml.jackson.databind.JsonNode;
import edu.brown.cs.student.main.types.Poster;
import org.springframework.boot.jackson.JsonComponent;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;

public class OCRAsyncTask {

    public HashMap sendPost(String apiKey, boolean isOverlayRequired, String imageUrl, String language) throws Exception {

        OCRParser parser = new OCRParser();

        URL obj = new URL("https://api.ocr.space/parse/image"); // OCR API Endpoints
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        //add request header
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");


        HashMap postDataParams = new HashMap();

        postDataParams.put("apikey", apiKey);
        postDataParams.put("isOverlayRequired", isOverlayRequired);
        postDataParams.put("url", imageUrl);
        postDataParams.put("language", language);
        postDataParams.put("ocrengine", 3);


        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(getPostDataString(postDataParams));
        wr.flush();
        wr.close();

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //return result
        System.out.println("Result: " + String.valueOf(response));

        return parser.deserialize(String.valueOf(response));

        //return String.valueOf(response);
    }

    public String getPostDataString(HashMap params) throws Exception {

        StringBuilder result = new StringBuilder();
        boolean first = true;

        Iterator<String> itr = params.keySet().iterator();

        while (itr.hasNext()) {

            String key = itr.next();
            Object value = params.get(key);

            if (first)
                first = false;
            else
                result.append("&");

            result.append(URLEncoder.encode(key, "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(value.toString(), "UTF-8"));

        }
        return result.toString();
    }
}
