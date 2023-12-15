// import React from "react";
import { Box, IconButton, Select } from "@chakra-ui/react";
import "../styles/Happenings.css";
import { images } from "./Home";
import {
  Search2Icon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { useCallback, useState } from "react";
import ViewPosterModal from "./ViewPosterModal";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const ImageCard = (
  title: string,
  path: string,
  date: string,
  time: string | null,
  location: string | null,
  link: string | null,
  description: string | null
) => {
  const [weekday, month, day] = date.split(" ");
  const [modalOpen, setModalOpen] = useState<string>("");
  const handleViewPoster = useCallback(() => {
    setModalOpen("viewImage");
  }, []);
  return (
    <>
      <div className="image-card" onClick={handleViewPoster}>
        <div className="card-backing">
          <img src={path} alt={title}></img>
        </div>
        <div className="image-overlay">
          <div className="top-info">
            <div className="month-date">
              <p id="month">{month}</p>
              <p id="day">{day}</p>
            </div>
            <div className="weekday-time">
              <p id="weekday">{weekday}</p>
              <p id="time">{time}</p>
            </div>
          </div>
          <div className="title-location">
            <p id="title">{title}</p>
            <p id="location">{location}</p>
          </div>
        </div>
        {modalOpen === "viewImage" && (
          <ViewPosterModal
            setModalState={setModalOpen}
            onClose={() => setModalOpen("")}
            title={title}
            path={path}
            date={date}
            time={time!}
            location={location!}
            link={link!}
            description={description!}
          />
        )}
      </div>
    </>
  );
};

export default function Happenings() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTags, setSearchTags] = useState<string>("");
  const [sortPosters, setSortPosters] = useState<string>("");

  return (
    <>
      <main className="happenings">
        <div className="search-filter-fixed">
          <div className="browse-search-bar">
            <Search2Icon boxSize={5} width={14} />
            <input
              className="browse-input"
              placeholder="Search"
              type="text"
              value={searchInput}
              onChange={(ev) => setSearchInput(ev.target.value)}
            />
            <Box w="10vw">
              <Select
                marginLeft="1vw"
                className="browse-select"
                fontSize="18px"
                height="6vh"
                color="white"
                placeholder="Tags"
                alignItems="center"
                border="none"
                icon={
                  <TriangleDownIcon id="triangle-icon" marginRight={"1vw"} />
                }
                value={searchTags}
                onChange={(ev) => setSearchTags(ev.target.value)}
              >
                <option value="option1">Free Food</option>
                <option value="option2">Party</option>
                <option value="option3">Outdoor</option>
              </Select>
            </Box>
          </div>
          <Box w="8.1vw">
            <Select
              marginLeft="1vw"
              className="sort-select"
              fontSize="18px"
              height="6vh"
              placeholder="Sort"
              alignItems="center"
              border="none"
              textAlign="right"
              value={sortPosters}
              onChange={(ev) => setSortPosters(ev.target.value)}
            >
              <option value="option1">Soonest</option>
              <option value="option3">Newest</option>
            </Select>
          </Box>
        </div>
        <Box
          className="grid"
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
    </>
  );
}
