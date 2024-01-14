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
import "../styles/Modal.css";
import { Search2Icon, TriangleUpIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import ViewPosterModal from "./ViewPosterModal";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  profileState,
  searchResultsState,
  searchState,
  tagsState,
} from "./atoms/atoms";
import { classNameTag, fetchTags, scrollToTop } from "../functions/fetch";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "../styles/Modal.css";

export interface IPoster {
  content: string;
  title: string;
  location?: string;
  startDate: number[];
  endDate?: number[];
  isRecurring: string;
  link?: string;
  description?: string;
  tags?: Set<string>;
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
  tags?: Set<string>;
  recurs: string;
  id: string;
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
  recurs,
  id,
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
  const [userId] = useRecoilState(profileState);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const fetchSaved = async (userId, id) => {
    try {
      //fetch savedposters
      const savedPosters = await fetch(
        "http://localhost:8080/users/savedPosters/" + userId.id
      );
      //if poster in saved , set class to clicked
      if (savedPosters.ok) {
        const posterSet = await savedPosters.json();
        //compare id passed in to each poster in set

        posterSet.data.forEach((poster) => {
          if (poster.id === id) {
            setIsClicked(true);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickHeart = async () => {
    const heartIcon = document.querySelector(`.heart-icon-hap`);
    if (heartIcon) {
      if (isClicked) {
        //if alredy clicked, un fill, un save
        //unfill
        setIsClicked(false);
        //unsave
        try {
          //add to database
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const url =
            "http://localhost:8080/users/unsavePoster?posterId=" +
            id +
            "&userId=" +
            userId.id;

          const res = await axios.put(url, null, config);

          return Promise.resolve(res.data.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            return Promise.resolve(
              `Error in fetch: ${error.response.data.message}`
            );
          } else {
            return Promise.resolve(
              "Error in fetch: Network error or other issue"
            );
          }
        }
      } else {
        //if not yet clicked, fill and save
        //fill
        setIsClicked(true);

        //save
        try {
          //add to database
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const url =
            "http://localhost:8080/users/savePoster?posterId=" +
            id +
            "&userId=" +
            userId.id;

          const res = await axios.put(url, null, config);
          console.log(res.data.data);
          return Promise.resolve(res.data.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            return Promise.resolve(
              `Error in fetch: ${error.response.data.message}`
            );
          } else {
            return Promise.resolve(
              "Error in fetch: Network error or other issue"
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    fetchSaved(userId, id);
  }, []);

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
      <div className="image-card" onClick={handleViewPoster} id={id}>
        <div className="card-backing">
          <img
            src={content}
            alt={title}
            loading="lazy"
            className="poster-image"
          />
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
            <div
              className={`heart-icon-hap ${isClicked ? "clicked" : ""}`}
              id={id}
              onClick={onClickHeart}
              style={{
                display: "flex",
                width: "8%",
                height: "8%",
                borderRadius: "10%",
                padding: "1%",
                boxSizing: "content-box",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                left: "85%",
                top: "3%",
              }}
            ></div>
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
            recurs={recurs}
            id={id}
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

export async function getNewestPosters() {
  try {
    const url = "http://localhost:8080/posters/upcomingnew";
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
  const [sortPosters, setSortPosters] = useState<string>("soonest");
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [showTags, setShowTags] = useState<boolean>(false); //shows the tags modal
  const [allTags, setAllTags] = useState<string[]>([]); //all tags in database
  const [tags, setTags] = useRecoilState<Set<string>>(tagsState); //list of tags user clicked
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef(null);

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
      getPosters().then((data) => {
        setSearchResults(data);
        setIsLoading(false);
      });
    }
    //fetchSaved(userId, id)
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (sortPosters === "newest") {
      getNewestPosters().then((data) => {
        setSearchResults(data);
        setIsLoading(false);
      });
    } else {
      // if user selects soonest or sort, which should sort by soonest by default
      getPosters().then((data) => {
        setSearchResults(data);
        setIsLoading(false);
      });
    }
  }, [sortPosters]);

  useEffect(() => {
    if (gridRef.current) {
      imagesLoaded(gridRef.current, function () {
        // console.log("all images are loaded");
        if (gridRef.current) {
          new Masonry(gridRef.current, {
            columnWidth: 34,
            itemSelector: ".image-card",
            gutter: 23,
          });
        }
      });
    }
  }, [searchResults]);

  const onClick = (tag: string) => {
    // if in tags list, take out
    setTags((prevTags) => {
      // using functional form of setTags so that onClick is updating the actual latest state of tags; otherwise always a step behind
      const updatedTags = new Set(prevTags); // Create a new set from the previous tags

      if (updatedTags.has(tag)) {
        updatedTags.delete(tag); // If the tag exists, remove it from the set
      } else {
        updatedTags.add(tag); // If the tag doesn't exist, add it to the set
      }

      //  console.log(updatedTags);
      return updatedTags; // Return the updated set
    });
  };

  const getAllResults = () => {
    getPosters().then((data) => {
      setSearchResults(data);
      setSearchInput("");
      setTags(new Set());
      setIsLoading(false);
    });
  };

  const addTagsToSearch = () => {
    setShowTags(false);
    getSearchResults();
  };

  const getSearchResults = async () => {
    if ((searchInput == "" || searchInput == " ") && tags.size == 0) {
      getAllResults();
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

        setSearchResults(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <img className="loading-gif" src="/loading.gif" />
        </div>
      )}
      <main
        className="happenings"
        style={{ height: "fit-content", minHeight: "87vh" }}
      >
        <div className="search-filter-fixed">
          <div style={{ display: "flex" }}>
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
            <div
              className="results"
              style={{
                fontFamily: "'quicksand', sans-serif",
                marginLeft: "2%",
                width: " 10%",
                position: "relative",
                top: "20%",
              }}
              onClick={getAllResults}
            >
              All Results
            </div>
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
              <option value="soonest">Soonest</option>
              <option value="newest">Newest</option>
            </Select>
          </Box>
        </div>

        <div className="modal-font">
          {showTags && (
            <Modal isOpen={true} onClose={() => setShowTags(false)}>
              <ModalBody className="modal-body">
                <ModalContent className="tag-modal-content">
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
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "2vw",
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
                      onClick={addTagsToSearch}
                      padding={"8px 18px"}
                    >
                      Add Tags to Search
                    </Button>
                  </div>
                </ModalContent>
              </ModalBody>
            </Modal>
          )}
        </div>
        {/* <div>All results</div> */}
        <div className="grid" ref={gridRef}>
          {searchInput !== "" && searchResults.length === 0 && (
            <h1 className="none">No results to display for this search term</h1>
          )}

          {searchResults.length > 0 &&
            searchResults.map((item, index) => (
              <Box key={index}>
                <ImageCard
                  title={item.title!}
                  content={item.content!}
                  startDate={item.startDate!}
                  endDate={item.endDate!}
                  location={item.location}
                  link={item.link}
                  description={item.description}
                  tags={item.tags}
                  recurs={item.isRecurring!}
                  id={item.id}
                />
              </Box>
            ))}
        </div>
        <IconButton
          className="scroll-top"
          color="white"
          backgroundColor="var(--dark-purple100)"
          icon={<TriangleUpIcon id="triangle-icon-up" />}
          aria-label={"scrolls user to bottom of page"}
          onClick={scrollToTop}
        />
      </main>
    </>
  );
}
