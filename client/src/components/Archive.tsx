// import React from "react";
import "../styles/Archive.css";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { ImageCard, getPosters } from "./Happenings";
import { Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTags } from "../functions/fetch";

export default function Archive() {
  const [searchResults, setSearchResults] = useState<IPoster[]>([]);
  const [, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const tagsData = await fetchTags();
        setAllTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchAllTags();
    const images = () => {
      getPosters().then((data) => setSearchResults(data));
    };
    images();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="happenings">
      <h1 id="year" style={{ marginBottom: "5%" }}>
        2023
      </h1>
      <Box
        className="archive-grid"
        padding={4}
        sx={{ columnCount: [1, 2, 3], columnGap: "3vw" }}
        marginTop={"2%"}
      >
        {searchResults.map(
          (item, index) =>
            item.startDate[0] < 2024 &&
            item.startDate[0] > 2022 && (
              <Box key={index}>
                <ImageCard
                  title={item.title}
                  content={item.content}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  location={item.location}
                  link={item.link}
                  description={item.description}
                  tags={item.tags}
                />
              </Box>
            )
        )}
      </Box>
      <h1 id="year">2022</h1>
      <Box
        className="archive-grid"
        padding={4}
        sx={{ columnCount: [1, 2, 3], columnGap: "3vw" }}
      >
        {searchResults.map(
          (item, index) =>
            item.startDate[0] < 2023 && (
              <Box key={index}>
                <ImageCard
                  title={item.title}
                  content={item.content}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  location={item.location}
                  link={item.link}
                  description={item.description}
                  tags={item.tags}
                />
              </Box>
            )
        )}
      </Box>
      <IconButton
        className="scroll-top"
        color="white"
        icon={<TriangleUpIcon id="triangle-icon-up" />}
        aria-label={"scrolls user to bottom of page"}
        onClick={scrollToTop}
      />
    </main>
  );
}
