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
} from "@chakra-ui/react";
import { Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";
import "../styles/Home.css";
import { ImageCard, getPosters } from "./Happenings";
import { KeyboardEvent, useEffect, useState } from "react";
import { fetchTags } from "../functions/fetch";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loadState,
  searchResultsState,
  searchState,
  tagsState,
} from "./atoms/atoms";

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
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [isLoading, setIsLoading] = useRecoilState(loadState);
  const [showTags, setShowTags] = useState<boolean>(false); //shows the tags modal
  const [allTags, setAllTags] = useState<string[]>([]); //all tags in database
  const [tags, setTags] = useRecoilState<Set<string>>(tagsState); //list of tags user clicked
  const navigate = useNavigate();

  useEffect(() => {
    getPosters().then((data) => setSearchResults(data));
    console.log(searchResults);
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

  useEffect(() => {
    const checkPostersDisplayed = () => {
      const posterElements = document.querySelectorAll(".image-card");
      if (isLoading) {
        console.log("posters loading...");
        console.log("currently " + posterElements.length + " image cards");

        if (posterElements.length === 9) {
          setIsLoading(false);
          console.log("done loading");
        }
      }

      if (posterElements.length !== 9) {
        setIsLoading(true);
      }
    };

    checkPostersDisplayed();
  }, [isLoading, searchResults]);

  // Handle Enter key press
  const handleKeyPress = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      navigate("/happenings");
    }
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

  return (
    <>
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
            <Box w="11.5vw" display="flex" justifyContent="right">
              <Button
                className="browse-select"
                fontSize="18px"
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

              {/* </Select> */}
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
            {searchResults.slice(0, 9).map((item, index) => (
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
                  id={item.id}
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
    </>
  );
}
