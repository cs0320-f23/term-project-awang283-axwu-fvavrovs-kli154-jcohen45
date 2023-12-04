// import React from "react";
import { Box, HStack, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import "../styles/Home.css";
import { ImageCard } from "./Happenings";

export const images = [
  {
    path: "./posters/poster1.png",
    title: "Boba with SASE",
    date: "Thursday Nov 30",
    time: "5:30 PM",
    location: "B&H 165",
  },
  {
    path: "./posters/poster2.png",
    title: "BWxD Committee Applications Open",
    date: "Thursday Nov 30",
    time: "5-6 PM",
    location: "Salomon 003",
  },
  {
    path: "./posters/poster3.png",
    title: "VISIONS Release Party",
    date: "Friday Dec 1",
    time: "6:30-8 PM",
    location: "The Underground",
  },
  {
    path: "./posters/poster4.png",
    title: "CSA x KASA Devils in Davol",
    date: "Friday Dec 1",
    time: "10 PM-1 AM",
    location: "Seoul Providence",
  },
  {
    path: "./posters/poster5.png",
    title: "Submit to VISIONS",
    date: "Saturday Dec 2",
    time: null,
    location: null,
  },
  {
    path: "./posters/poster6.png",
    title: "Innovation and Medical Product Development with Dr. Weiss",
    date: "Saturday Dec 2",
    time: "6:30 PM",
    location: "B&H 159",
  },
];

export default function Home() {
  return (
    <main className="posters">
      <div className="home-content">
        <label className="label">
          <div className="text-wrapper">Posters @ Brown</div>
        </label>
        <div className="search-bar">
          <Search2Icon id="search-icon" boxSize={5} width={14} />
          <input placeholder="Search" type="text" />
          <Box w="12vw">
            <Select
              marginLeft="1vw"
              className="tag-select"
              fontSize="20px"
              height="7vh"
              color="white"
              placeholder="tags"
              alignItems="center"
              border="none"
            >
              {/* TODO: fetch list of tags and map each of them to an option, when clicked, set list of selected tags to contain tag, when clicked again, unselect tag */}
              <option value="option1">Free Food</option>
              <option value="option2">Party</option>
              <option value="option3">Outdoor</option>
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
        <div className="happenings-label">Happenings Today</div>
        <div className="gallery">
          <HStack spacing="3vw" alignItems="flex-start">
            {images.map((item) =>
              ImageCard(
                item.title,
                item.path,
                item.date,
                item.time,
                item.location
              )
            )}
          </HStack>
        </div>
      </div>
    </main>
  );
}
