// import React from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Select,
} from "@chakra-ui/react";
import "../styles/Happenings.css";
import { Search2Icon, TriangleUpIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import ViewPosterModal from "./ViewPosterModal";
import axios from "axios";
import { useRecoilState } from "recoil";
import { searchResultsState, searchState, tagsState } from "./atoms/atoms";
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
  const [sortPosters, setSortPosters] = useState<string>("");
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [showTags, setShowTags] = useState<boolean>(false); //shows the tags modal
  const [allTags, setAllTags] = useState<string[]>([]); //all tags in database
  const [tags, setTags] = useRecoilState<Set<string>>(tagsState); //list of tags user clicked

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
    if (searchInput.length > 0 || tags.size > 0) {
      getSearchResults();
    } else {
      getPosters().then((data) => setSearchResults(data));
    }
  }, []);

  //onclick
  const onClick = (tag: string) => {
    //if in tagslist, take out
    const updatedTags = new Set(tags); // Create a new set from the current tags

    if (updatedTags.has(tag)) {
      updatedTags.delete(tag); // If the tag exists, remove it from the set
    } else {
      updatedTags.add(tag); // If the tag doesn't exist, add it to the set
    }

    setTags(updatedTags);
  };

  const classNameTag = (index: number) => {
    if (index % 3 == 0) {
      return "magenta-tag";
    } else if (index % 3 == 1) {
      return "green-tag";
    } else {
      return "blue-tag";
    }
  };

  const getSearchResults = async () => {
    if ((searchInput == "" || searchInput == " ") && tags.size == 0) {
      getPosters().then((data) => setSearchResults(data));
    } else if ((searchInput == "" || searchInput == " ") && tags.size > 0) {
      let tagString = "";
      tags.forEach((tag) => {
        tagString += tag + ",";
      });
      tagString = tagString.slice(0, -1);

      try {
        const response = await fetch(
          `http://localhost:8080/posters/tag?tag=${tagString}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const results: IPoster[] = await response.json();
        console.log(results);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      try {
        let tagString = "";
        tags.forEach((tag) => {
          tagString += tag + ",";
        });
        tagString = tagString.slice(0, -1);

        const response = await fetch(
          `http://localhost:8080/posters/term?term=${searchInput}&tags=${tagString}`
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
          <div
            className="browse-search-bar"
            style={{ justifyContent: "space-between" }}
          >
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
            <Box w="10vw" display="flex" justifyContent="right">
              <Button
                marginLeft="1vw"
                width="7vw"
                className="browse-select"
                fontSize="18px"
                height="6vh"
                color="white"
                alignItems="center"
                border="none"
                onClick={() => setShowTags(true)}
              >
                Tags
              </Button>
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
          {showTags && (
            <Modal isOpen={true} onClose={() => setShowTags(false)}>
              <ModalBody>
                <ModalContent>
                  <ModalHeader className="modal-header">
                    Choose Tags
                  </ModalHeader>
                  <ModalCloseButton
                    className="close-button"
                    onClick={() => setShowTags(false)}
                  />
                  <div
                    className="tags-container"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div
                      className="tags-div"
                      style={{
                        paddingLeft: "5%",
                        width: "100%",
                      }}
                    >
                      {allTags.map((tag, index) => {
                        const isSelected = tags.has(tag);
                        const tagClass = isSelected
                          ? "selected-tag" + " " + classNameTag(index)
                          : classNameTag(index);

                        return (
                          <div
                            key={tag}
                            className={tagClass}
                            onClick={() => onClick(tag)}
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                    <Button
                      className="final-upload-button"
                      onClick={() => setShowTags(false)}
                      width={"40%"}
                      marginTop={"3%"}
                    >
                      Add Tags to Search
                    </Button>
                  </div>
                </ModalContent>
              </ModalBody>
            </Modal>
          )}

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
