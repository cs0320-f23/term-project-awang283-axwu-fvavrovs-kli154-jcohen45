export async function fetchTags() {
  try {
    const response = await fetch("http://localhost:8080/posters/alltags");
    if (response.ok) {
      const tagsData = await response.json();
      //setAllTags(tagsData);
      return tagsData;
    } else {
      throw new Error("Failed to fetch tags");
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}
