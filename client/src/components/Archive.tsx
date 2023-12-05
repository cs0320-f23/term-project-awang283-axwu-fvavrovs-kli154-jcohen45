// import React from "react";
import "../styles/Archive.css";
import { images } from "./Home";
import { ImageCard } from "./Happenings";
import { Box } from "@chakra-ui/react";

export default function Archive() {
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
              item.location
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
              item.location
            )}
          </Box>
        ))}
      </Box>
    </main>
  );
}
