// import React from "react";
import "../styles/Archive.css";
import { images } from "./Home";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { ImageCard } from "./Happenings";
import { Box, IconButton } from "@chakra-ui/react";

export default function Archive() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <main className="happenings">
      <h1 id="year">2023</h1>
      <Box
        className="archive-grid"
        padding={4}
        sx={{ columnCount: [1, 2, 3], columnGap: "3vw" }}
      >
        {images.map((item, index) => (
          <Box key={index}>
            {ImageCard(
              item.title,
              item.path,
              item.date,
              item.time,
              item.location,
              item.link,
              item.description
            )}
          </Box>
        ))}
      </Box>
      <h1 id="year">2022</h1>
      <Box
        className="archive-grid"
        padding={4}
        sx={{ columnCount: [1, 2, 3], columnGap: "3vw" }}
      >
        {images.map((item, index) => (
          <Box key={index}>
            {ImageCard(
              item.title,
              item.path,
              item.date,
              item.time,
              item.location,
              item.link,
              item.description
            )}
          </Box>
        ))}
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
