// import React from "react";
import "../styles/Archive.css";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { IPoster, ImageCard } from "./Happenings";
import { Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTags } from "../functions/fetch";
import axios from "axios";
import Masonry from "react-responsive-masonry";

export default function Archive() {
  const [searchResults, setSearchResults] = useState<IPoster[]>([]);
  const [, setAllTags] = useState<string[]>([]);

  async function getArchive() {
    try {
      const url = "http://localhost:8080/posters/archive";
      const res = await axios.get<IPoster[]>(url);
      return Promise.resolve(res.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        console.log(error);
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        console.log("Network error or other issue:", error.message);
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  }

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
      getArchive().then((data) => setSearchResults(data));
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
      <h1 id="year">2023</h1>
      <Masonry className="grid" columnsCount={3}>
        {searchResults.map(
          (item, index) =>
            item.startDate[0] === 2023 && (
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
      </Masonry>
      <h1 id="year">2022</h1>
      <Masonry className="grid" columnsCount={3}>
        {searchResults.map(
          (item, index) =>
            item.startDate[0] === 2022 && (
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
      </Masonry>
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
