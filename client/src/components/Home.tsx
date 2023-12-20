// import React from "react";
import { Box, HStack, IconButton, Select } from "@chakra-ui/react";
import { Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";
import "../styles/Home.css";
import { IPoster, ImageCard, getPosters } from "./Happenings";
import { useEffect, useState } from "react";
import { fetchTags } from "../functions/fetch";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "./atoms/atoms";

const scrollToBottom = () => {
  window.scrollTo({
    top:
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight -
      40,
    behavior: "smooth",
  });
};

export default function Home() {
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const [searchTags, setSearchTags] = useState<string>("");
  const [allPosters, setAllPosters] = useState<IPoster[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchInput("");
  }, []);

  // Handle Enter key press
  const handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      navigate("/happenings");
    }
  };

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const tagsData = await fetchTags();
        setAllTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    getPosters().then((data) => setAllPosters(data));
    fetchAllTags();
  }, []);

  return (
    <main className="posters">
      <div className="home-content">
        <label className="label">
          <div className="text-wrapper">Posters @ Brown</div>
        </label>
        <div className="search-bar">
          <Search2Icon boxSize={5} width={14} />
          <input
            className="search-input"
            placeholder="Search"
            type="text"
            value={searchInput}
            onChange={(ev) => setSearchInput(ev.target.value)}
            onKeyDown={(ev) => handleKeyPress(ev)}
          />{" "}
          <Box w="11.5vw">
            <Select
              className="tag-select"
              fontSize="20px"
              height="7vh"
              color="white"
              placeholder="Tags"
              alignItems="center"
              border="none"
              icon={
                <TriangleDownIcon id="triangle-icon" marginRight={"1.25vw"} />
              }
              value={searchTags}
              onChange={(ev) => setSearchTags(ev.target.value)}
            >
              {allTags.map((tag, index) => {
                return (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                );
              })}
            </Select>
          </Box>
        </div>
        <div className="tags">
          <span className="tag-text">Suggested tags:</span>{" "}
          <div className="tag-holder">
            <div className="magenta-tag">Free Food</div>
            <div className="green-tag">Party</div>
            <div className="blue-tag">Outdoor</div>
          </div>
        </div>
        {/* map each poster to an img w/in a div  */}
      </div>
      <div className="happenings">
        <div className="happenings-label">Happening Soon</div>
        <HStack
          spacing="3vw"
          alignItems="flex-start"
          overflowX="auto"
          padding="1.5vh 4vw"
          id="scroll"
        >
          {allPosters.slice(0, 9).map((item, index) => (
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
          ))}
        </HStack>
      </div>
      <IconButton
        className="scroll-bottom"
        color="white"
        icon={<TriangleDownIcon id="triangle-icon-down" />}
        aria-label={"scrolls user to bottom of page"}
        onClick={scrollToBottom}
      />
    </main>
  );
}
