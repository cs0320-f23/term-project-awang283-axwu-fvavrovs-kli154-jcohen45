// import React from "react";
import "../styles/Archive.css";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { IPoster, ImageCard } from "./Happenings";
import { Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTags } from "../functions/fetch";
import axios from "axios";
import Masonry from "react-responsive-masonry";
import { loadState } from "./atoms/atoms";
import { useRecoilState } from "recoil";

export default function Archive() {
  const [searchResults, setSearchResults] = useState<IPoster[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useRecoilState(loadState);

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

  useEffect(() => {
    const checkPostersDisplayed = () => {
      const posterElements = document.querySelectorAll(".image-card");
      const numberOfPosters = searchResults.length;
      if (isLoading) {
        console.log("posters loading...");
        console.log("currently " + posterElements.length + " image cards");
        console.log("should be " + numberOfPosters + " many posters");

        if (
          posterElements.length !== 0 &&
          posterElements.length === numberOfPosters
        ) {
          setIsLoading(false);
          console.log("done loading");
        }
      }

      if (
        (posterElements.length === 0 && numberOfPosters === 0) ||
        posterElements.length !== numberOfPosters
      ) {
        setIsLoading(true);
      }
    };

    checkPostersDisplayed();
  }, [isLoading, searchResults]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className="happenings">
        <h1 id="year">2024</h1>
        <Masonry className="grid" columnsCount={3}>
          {searchResults.map(
            (item, index) =>
              item.startDate[0] === 2024 && (
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
                    recurs={item.isRecurring}
                  />
                </Box>
              )
          )}
        </Masonry>
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
                    recurs={item.isRecurring}
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
                    recurs={item.isRecurring}
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
    </>
  );
}
