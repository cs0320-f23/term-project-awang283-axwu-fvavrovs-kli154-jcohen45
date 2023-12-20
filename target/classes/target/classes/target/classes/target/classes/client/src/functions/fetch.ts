//for functions where we use the same backend call multiple times

export async function fetchTags() {
  try {
    const response = await fetch("http://localhost:8080/posters/alltags");
    if (response.ok) {
      const tagsData = await response.json();
      return tagsData;
    } else {
      throw new Error("Failed to fetch tags");
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
} //notes : liking posts, making it an app, giving users recs by interests
