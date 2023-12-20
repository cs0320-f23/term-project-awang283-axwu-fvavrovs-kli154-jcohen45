// import React from "react";
import { Box, IconButton, Select } from "@chakra-ui/react";
import "../styles/Happenings.css";
import {
  Search2Icon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import ViewPosterModal from "./ViewPosterModal";
import axios from "axios";
import { useRecoilState } from "recoil";
import { searchResultsState, searchState } from "./atoms/atoms";
import { fetchTags } from "../functions/fetch";
import Masonry from "react-responsive-masonry";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export interface IPoster {
  content: string;
  title: string;
  location?: string;
  startDate: number[];
  endDate?: number[];
  isRecurring: boolean;
  link?: string;
  description?: string;
  tags?: string[];
  id: string;
  createdAt: number[];
  poster: boolean;
}

interface ImageCardProps {
  title: string;
  content: string;
  startDate: number[];
  endDate?: number[];
  location?: string;
  link?: string;
  description?: string;
  tags?: string[];
}

export const ImageCard: React.FC<ImageCardProps> = ({
  title,
  content,
  startDate,
  endDate,
  location,
  link,
  description,
  tags,
}) => {
  const listMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const listWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [modalOpen, setModalOpen] = useState<string>("");
  const handleViewPoster = useCallback(() => {
    setModalOpen("viewImage");
  }, []);
  const monthName =
    listMonths[new Date(JSON.stringify(startDate[1])).getMonth()];
  const month = monthName.substring(0, 3);
  const fullDate = `${monthName} ${startDate[2]}, ${startDate[0]}`;
  const weekday = listWeekdays[new Date(fullDate).getDay()];
  function time(date: number[]) {
    let minutes = JSON.stringify(date[4]);
    if (date[4] === 0) {
      minutes = "00";
    }
    if (date[3] > 12) {
      return date[3] - 12 + ":" + minutes + " PM";
    } else {
      return date[3] + ":" + minutes + " AM";
    }
  }
  const startTime = time(startDate);
  let endTime = null;
  if (endDate) {
    endTime = time(endDate);
  }
  const day = startDate[2];

  return (
    <>
      <div className="image-card" onClick={handleViewPoster}>
        <div className="card-backing">
          <img src={content} alt={title} />
        </div>
        <div className="image-overlay">
          <div className="top-info">
            <div className="month-date">
              <p id="month">{month}</p>
              <p id="day">{day}</p>
            </div>
            <div className="weekday-time">
              <p id="weekday">{weekday}</p>
              <p id="time">
                {startTime}
                {endTime && "-" + endTime}
              </p>
            </div>
          </div>
          <div className="title-location">
            <p id="title">{title}</p>
            <p id="location">{location}</p>
          </div>
        </div>
        {modalOpen === "viewImage" && (
          <ViewPosterModal
            onClose={() => setModalOpen("")}
            title={title}
            path={content}
            date={fullDate}
            startTime={startTime}
            endTime={endTime!}
            location={location!}
            link={link!}
            description={description!}
            tags={tags!}
          />
        )}
      </div>
    </>
  );
};

export async function getPosters() {
  try {
    const url = "http://localhost:8080/posters/upcoming";
    const res = await axios.get<IPoster[]>(url);
    return Promise.resolve(res.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data.message);
      console.log(error);
      return Promise.resolve(`Error in fetch: ${error.response.data.message}`);
    } else {
      console.log("Network error or other issue:", error.message);
      return Promise.resolve("Error in fetch: Network error or other issue");
    }
  }
}

export default function Happenings() {
  const [searchTags, setSearchTags] = useState<string>("");
  const [sortPosters, setSortPosters] = useState<string>("");
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [allTags, setAllTags] = useState<string[]>([]);

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
    if (searchInput.length > 0) {
      getSearchResults();
    } else {
      getPosters().then((data) => setSearchResults(data));
    }
  }, []);

  const getSearchResults = async () => {
    if (searchInput == "" || searchInput == " ") {
      getPosters().then((data) => setSearchResults(data));
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/posters/term?term=${searchInput}&tags=${searchTags}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const results: IPoster[] = await response.json();

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

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
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  getSearchResults();
                }
              }}
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
        <Masonry
          className="grid"
          columnsCount={3}
          style={{ margin: "16.5vh 4vw" }}
        >
          {searchResults.map((item, index) => (
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
