// import React from "react";
import { Box, Select } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import "../styles/Home.css";

const images = [
  { id: "1", path: "./posters/poster1.png" },
  { id: "2", path: "./posters/poster2.png" },
  { id: "3", path: "./posters/poster3.png" },
  { id: "4", path: "./posters/poster4.png" },
  { id: "5", path: "./posters/poster5.png" },
  { id: "6", path: "./posters/poster6.png" },
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
          {images.map((item, index) => (
            <div className="pic" id={"pic" + JSON.stringify(index)} key={index}>
              <img src={item.path}></img>
            </div>
          ))}
        </div>
      </div>
      <span></span>
    </main>
  );
}
