package edu.brown.cs.student.main;

import java.util.*;

public class Tags {
  private HashMap<String, List<String>> jumboTags;

  public Tags() {
    this.jumboTags = new HashMap<>();
    jumboTags.put("alcohol", new ArrayList<>(Arrays.asList("alc", "booze")));
    jumboTags.put("subfree", new ArrayList<>(Arrays.asList("subfree", "sub-free", "sober")));
    jumboTags.put("dance", new ArrayList<>(Arrays.asList("danc", "ballroom")));
    jumboTags.put(
        "performance",
        new ArrayList<>(
            Arrays.asList("performance", "concert", "show", "theat", "taps", "musical")));
    jumboTags.put(
        "a capella",
        new ArrayList<>(
            Arrays.asList(
                "a cappella",
                "higher keys",
                "bear necessities",
                "derbies",
                "madrigal",
                "jabberwocks",
                "chattertocks",
                "ursa minors",
                "shades of brown",
                "harmonic motion",
                "beauty and the beats",
                "acapella")));
    jumboTags.put(
        "live music",
        new ArrayList<>(
            Arrays.asList("live music", "jam", "a cap", "acapella", "concert", "song")));
    jumboTags.put(
        "sports",
        new ArrayList<>(
            Arrays.asList(
                "sport",
                "football",
                "soccer",
                "basketball",
                "volleyball",
                "baseball",
                "danc",
                "hockey",
                "fencing",
                "golf",
                "gym",
                "rowing",
                "swim",
                "tennis",
                "intramural",
                "athlet",
                "recreation",
                "fitness")));
    jumboTags.put(
        "free food",
        new ArrayList<>(
            Arrays.asList(
                "food",
                "pizza",
                "kabob",
                "snack",
                "boba",
                "lunch",
                "dinner",
                "brunch",
                "breakfast",
                "beverage")));
    jumboTags.put("party", new ArrayList<>(Arrays.asList("party")));
    jumboTags.put(
        "outdoors",
        new ArrayList<>(
            Arrays.asList(
                "outdoor",
                "camping",
                "hike",
                "hiking",
                "outing",
                "bird",
                "nature",
                "trail",
                "beach",
                "walk",
                "garden",
                "recreation",
                "wildlife")));
    jumboTags.put(
        "volunteering",
        new ArrayList<>(Arrays.asList("volunteer", "tutor", "unpaid", "nonprofit", "non-profit")));
    jumboTags.put("arts", new ArrayList<>(Arrays.asList(" art", "exhibit", "gallery")));
    jumboTags.put(
        "crafts",
        new ArrayList<>(Arrays.asList("craft", "paint", "draw", "knit", "crochet", "decorat")));
    jumboTags.put("tech", new ArrayList<>(Arrays.asList("tech", "comput")));
    jumboTags.put(
        "stem",
        new ArrayList<>(
            Arrays.asList("stem", "scien", "engin", "tech", "math", "biology", "chem", "physics")));
    jumboTags.put("entry fee", new ArrayList<>(Arrays.asList("entry fee")));
    jumboTags.put("free", new ArrayList<>(Arrays.asList("free")));
    jumboTags.put("id required", new ArrayList<>(Arrays.asList("id required")));
    jumboTags.put("online", new ArrayList<>(Arrays.asList("online", "zoom", "virtual")));
    jumboTags.put("in person", new ArrayList<>(Arrays.asList("in person", "in-person")));
    jumboTags.put(
        "activism", new ArrayList<>(Arrays.asList("activis", "protest", "rally", "petition")));
    jumboTags.put(
        "LGBTQ+",
        new ArrayList<>(
            Arrays.asList("lgbt", "gay", "trans ", "transgender", "queer", "Stonewall")));
    jumboTags.put("UFLI", new ArrayList<>(Arrays.asList("ufli", "first-gen", "low-income")));
    jumboTags.put(
        "POC",
        new ArrayList<>(
            Arrays.asList(
                "poc",
                "black",
                "asian",
                "hispanic",
                "latin",
                "aapi",
                "indigenous",
                "native american",
                "bcsc",
                "of color")));
    jumboTags.put("finance", new ArrayList<>(Arrays.asList("finance", "bank", "consult", "econ")));
    jumboTags.put("donation request", new ArrayList<>(Arrays.asList("donat", "drive")));
    jumboTags.put(
        "religious",
        new ArrayList<>(
            Arrays.asList("religi", "christian", "jew", "muslim", "worship", "prayer")));
    jumboTags.put("formal", new ArrayList<>(Arrays.asList("formal", "black tie")));
    jumboTags.put("casual", new ArrayList<>(Arrays.asList("casual")));
    jumboTags.put("holiday", new ArrayList<>(Arrays.asList("holiday")));
    jumboTags.put("academic", new ArrayList<>(Arrays.asList("academic", "study", "research")));
    jumboTags.put("study group", new ArrayList<>(Arrays.asList("study group")));
    jumboTags.put("premed", new ArrayList<>(Arrays.asList("premed", "pre-med")));
    jumboTags.put("prelaw", new ArrayList<>(Arrays.asList("prelaw", "pre-law", "legal")));
    jumboTags.put("women", new ArrayList<>(Arrays.asList("women", "woman", "girl")));
    jumboTags.put("dug", new ArrayList<>(Arrays.asList("dug")));
    jumboTags.put("club", new ArrayList<>(Arrays.asList("club")));
    jumboTags.put("application", new ArrayList<>(Arrays.asList("apply", "application")));
    jumboTags.put("rsvp required", new ArrayList<>(Arrays.asList("rsvp required", "register")));
    jumboTags.put("movie", new ArrayList<>(Arrays.asList("movie", "screen")));
  }

  public ArrayList<String> getTags() {
    ArrayList tags =
        new ArrayList<String>(
            Arrays.asList(
                "alcohol",
                "subfree",
                "dance",
                "performance",
                "a capella",
                "live music",
                "sports",
                "free food",
                "party",
                "outdoors",
                "volunteering",
                "arts",
                "crafts",
                "tech",
                "entry fee",
                "free",
                "ID required",
                "online",
                "in person",
                "activism",
                "LGBTQ+",
                "UFLI",
                "POC",
                "finance",
                "donation request",
                "religious",
                "formal",
                "casual",
                "holiday",
                "academic",
                "study group",
                "premed",
                "prelaw",
                "women",
                "rsvp",
                "dug",
                "languages",
            "semiformal",
                "career",
                "application",
                "publication",
                "cultural",
                "STEM",
                "Brown students only"));
    return tags;
  }

  public HashMap<String, List<String>> getJumboTags() {
    return this.jumboTags;
  }
}
