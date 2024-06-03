import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";
import "../styles/Home.css";
import "../styles/ImageCard.css";
import "../styles/Modal.css";
import { getPosters } from "./Happenings";
import { ImageCard } from "./ImageCard";
import { KeyboardEvent, useEffect, useState } from "react";
import { classNameTag, fetchTags } from "../functions/fetch";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchResultsState, searchState, tagsState } from "./atoms/atoms";

const scrollToBottom = () => {
  window.scrollTo({
    top:
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight -
      50,
    behavior: "smooth",
  });
};

export default function Home() {
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [isLoading, setIsLoading] = useState(true);
  const [showTags, setShowTags] = useState<boolean>(false); //shows the tags modal
  const [allTags, setAllTags] = useState<string[]>([]); //all tags in database
  const [tags, setTags] = useRecoilState<Set<string>>(tagsState); //list of tags user clicked
  const navigate = useNavigate();

  useEffect(() => {
    getPosters().then((data) => {
      setSearchResults(data);
      setIsLoading(false);
    });
    const fetchAllTags = async () => {
      try {
        const tagsData = await fetchTags();
        setAllTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    setSearchInput("");
    fetchAllTags();
  }, []);

  // Handle Enter key press
  const handleKeyPress = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      navigate("/happenings");
    }
  };

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

      console.log(updatedTags);
      return updatedTags; // Return the updated set
    });
  };

  const addTagsToSearch = () => {
    setShowTags(false);
    navigate("/happenings");
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <img className="loading-gif" src="/loading.gif" />
        </div>
      )}
      <main className="posters" style={{ height: "fit-content" }}>
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
            <Box w="11.5vw" display="flex" justifyContent="right">
              <Button
                className="browse-select"
                fontSize="20px"
                width="8vw"
                height="7vh"
                color="white"
                alignItems="center"
                border="none"
                onClick={() => setShowTags(true)}
              >
                Tags
              </Button>
              {showTags && (
                <Modal isOpen={true} onClose={() => setShowTags(false)}>
                  <ModalOverlay className="modal-overlay" />
                  <ModalBody className="modal-body">
                    <ModalContent className="tag-modal-content">
                      <ModalHeader className="modal-header">
                        Select Tags
                      </ModalHeader>
                      <ModalCloseButton
                        className="close-button"
                        onClick={() => setShowTags(false)}
                      />
                      <div
                        className="tags-container"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: "2vw",
                          paddingLeft: "1.5vw",
                        }}
                      >
                        <div
                          className="tags-div"
                          style={{
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
            </Box>
          </div>
          <div className="tags">
            <span className="tag-text">Suggested Tags:</span>{" "}
            <div className="tag-holder">
              <div className="magenta-tag">Free Food</div>
              <div className="green-tag">Party</div>
              <div className="blue-tag">Outdoor</div>
            </div>
          </div>
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
            {searchResults.slice(0, 9).map((item, index) => (
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
            <div style={{ width: "100%", padding: "1vw" }}>
              <NavLink
                to="/happenings"
                style={{
                  fontFamily: "'quicksand', sans-serif",
                  width: "100px",
                }}
              >
                See More
              </NavLink>
            </div>
          </HStack>
        </div>
        <IconButton
          className="scroll-bottom"
          color="white"
          backgroundColor="var(--dark-purple100)"
          icon={<TriangleDownIcon id="triangle-icon-down" />}
          aria-label={"scrolls user to bottom of page"}
          onClick={scrollToBottom}
        />
      </main>
    </>
  );
}
