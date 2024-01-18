import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TagsModal from "./TagsModal";
import {
  modalOpenState,
  posterSrcState,
  posterState,
  profileState,
} from "./atoms/atoms";
import { useRecoilState } from "recoil";
import PopupModal from "./PopupModal";
import { IPoster } from "./Happenings";

export interface IPosterObject {
  id: string;
  content?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isRecurring?: string;
  link?: string;
  description?: string;
  tags?: Set<string>;
}

export default function CreateImageModal() {
  const [showTags, setShowTags] = useState<boolean>(false);
  const [posterSrc, setPosterSrc] = useRecoilState(posterSrcState);
  const [poster, setPoster] = useRecoilState<IPosterObject>(posterState);
  const [posterId, setPosterId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useRecoilState<string>(modalOpenState);
  // const [intervalID, setIntervalID] = useState<number>();
  const [profile] = useRecoilState(profileState);

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    //defaults to current date at 11:59PM + ensures startDate will always be filled with some value
    const todayDateTime = yyyy + "-" + mm + "-" + dd + "T23:59";
    setPoster({ ...poster, startDate: todayDateTime, isRecurring: "NEVER" });
  }, []);

  const handleChange = (
    value: string[] | string | Set<string>,
    property: keyof IPoster,
    callback?: () => void
  ) => {
    // using functional form of setPoster so that it updates using the current stored state in poster
    setPoster((prevPoster) => {
      let updatedValue: {
        [x: string]: string[] | Set<string> | string;
      };
      if (value instanceof Set) {
        updatedValue = { [property]: Array.from(value) };
      } else {
        updatedValue = { [property]: value };
      }

      const newPoster = {
        ...prevPoster,
        ...updatedValue,
      };

      if (callback) {
        callback();
      }

      console.log(JSON.stringify(newPoster));
      return newPoster;
    });

    return poster;
  };

  const setCVFields = async (id: string) => {
    setIsLoading(true);
    try {
      const url = "http://localhost:8080/posters/" + id;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const res = await response.json();
      setPoster({
        ...poster,
        title: res.data.title,
        description: res.data.description,
        tags: res.data.tags,
      });
      setIsLoading(false);
      return Promise.resolve(res.data);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  const setUserLink = async (target: EventTarget) => {
    //on change
    const inputElement = target as HTMLInputElement;

    //setURL
    setPoster({ ...poster, content: inputElement.value });

    if (!inputElement.value.includes("https://i.imgur.com")) {
      try {
        //add to database
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url =
          "http://localhost:8080/posters/create/fromlink?userId=" + profile.id;
        const formData = new FormData();
        formData.append("content", inputElement.value);
        // formData.append("userId", profile.id);
        setIsLoading(true);
        const res = await axios.post(url, formData, config);
        setPosterSrc(inputElement.value);
        console.log(res.data.data);
        setPosterId(res.data.data.id);
        setCVFields(res.data.data.id);
        return Promise.resolve(res.data.data);
      } catch (error) {
        setIsLoading(false);
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
  };

  const createImgurLink = async (file: File | string) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const url = "http://localhost:8080/posters/create/imgur";

      const formData = new FormData();
      formData.append("content", file);
      formData.append("userId", profile.id);
      //console.log("Before axios request");
      setIsLoading(true);
      const res = await axios.post(url, formData, config);
      //console.log("After axios request");
      setPosterId(res.data.data.id);

      return Promise.resolve(res.data.data);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        console.log(error);
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  const handlePosterUpload = async (target: EventTarget & HTMLInputElement) => {
    console.log("called poster upload");
    if (target.files) {
      const file = target.files[0]; //getting the file object

      if (file && file.type.startsWith("image/")) {
        //convert our image file into a format that can be fed into img component's src property to be displayed after upload
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target && typeof e.target.result === "string") {
            setPosterSrc(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }

      const output = await createImgurLink(file);
      // fetchPosterData(output.id);
      console.log("output.id is: " + output.id);
      setCVFields(output.id);
      setPoster({ ...poster, content: output.content });
    }
  };

  // function fetchPosterData(id: string) {
  //   console.log("made it here!");
  //   makeInterval(id);
  //   if (!intervalID) {
  //     const intId = setInterval(() => {
  //       makeInterval(id);
  //     }, 1000);
  //     setIntervalID(intId);
  //     console.log(intId);
  //   }
  // }

  // async function makeInterval(id: string) {
  //   if (!poster.title) {
  //     const posterData = await setCVFields(id);
  //     if (posterData.title) {
  //       // Poster.title is defined, clear the interval
  //       console.log(intervalID);
  //       clearInterval(intervalID);
  //       console.log("cleared interval");
  //     }
  //   }
  // }

  const onSaveSelectTags = () => {
    setShowTags(true);
  };

  const onBack = () => {
    setShowTags(false);
  };

  const onClose = () => {
    //if any field is filled out
    if (Object.keys(poster).length > 2) {
      //popup u sure u wanna del this?
      setModalOpen("popup");
    } else {
      setModalOpen("");
    }
  };

  useEffect(() => {
    const popup = () => {
      if (modalOpen === "popup" && Object.keys(poster).length > 2) {
        return <PopupModal posterID={posterId} setPosterSrc={setPosterSrc} />;
      }
    };
    () => popup;
  }, [Object.keys(poster).length, modalOpen]);

  return (
    <>
      {modalOpen === "popup" && Object.keys(poster).length > 2 && (
        <PopupModal posterID={posterId} setPosterSrc={setPosterSrc} />
      )}
      {modalOpen == "createImage" && (
        <Modal closeOnOverlayClick={false} isOpen={true} onClose={onClose}>
          <div className="modal-font">
            <ModalOverlay className="modal-overlay" />
            <ModalContent className="modal-content">
              {isLoading && (
                <div className="loading-screen">
                  <img className="loading-gif" src="/loading.gif" />
                </div>
              )}
              <ModalHeader className="modal-header">
                Upload a Poster
              </ModalHeader>
              <ModalCloseButton
                className="close-button"
                onClick={onClose}
                style={{ backgroundColor: "var(--dark-purple100)" }}
              />

              <ModalBody className="modal-body">
                <div className="create-div">
                  {posterSrc ? (
                    <Box
                      className="view-image"
                      maxHeight={"76vh"}
                      overflowY={"scroll"}
                      style={{ marginTop: 0 }}
                    >
                      <img src={posterSrc}></img>
                    </Box>
                  ) : (
                    <div className="image-container"></div>
                  )}

                  {showTags ? (
                    <TagsModal
                      onClose={onClose}
                      onBack={onBack}
                      posterId={posterId}
                      handleChange={handleChange}
                      setShowTags={setShowTags}
                    />
                  ) : (
                    <div className="input-fields">
                      <div>
                        <h3>
                          Image <span style={{ color: "red" }}>*</span>
                        </h3>
                        <div className="input-text-input">
                          <Input
                            id="image-url"
                            placeholder="Enter URL - .PNG or .JPG/JPEG"
                            value={poster.content}
                            onChange={(ev) =>
                              handleChange(ev.target.value, "content")
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setUserLink(e.target);
                              }
                            }}
                            // needs to be able to take in a user link and call backend to create poster
                          ></Input>
                          <h3>or</h3>
                          <label
                            htmlFor="image-upload"
                            className="upload-button"
                          >
                            Upload
                          </label>
                          <Input
                            type="file"
                            onChange={(ev) => handlePosterUpload(ev.target)}
                            id="image-upload"
                            accept="image/png, image/jpeg, image/jpg"
                            display="none"
                          ></Input>
                        </div>
                      </div>
                      <div className="title-div">
                        <h3>
                          Title <span style={{ color: "red" }}>*</span>
                        </h3>
                        <Input
                          placeholder="Enter Title"
                          value={poster.title}
                          onChange={(ev) =>
                            handleChange(ev.target.value, "title")
                          }
                        ></Input>
                      </div>
                      <div className="location-div">
                        <div>
                          <h3>Location</h3>
                          <Input
                            placeholder="Enter Location"
                            width="23.4vw"
                            value={poster.location}
                            onChange={(ev) =>
                              handleChange(ev.target.value, "location")
                            }
                          />
                        </div>
                        <div>
                          <h3>Repeats</h3>
                          <Select
                            placeholder="Repeats"
                            id="recur-select"
                            width="8vw"
                            color="white"
                            value={poster.isRecurring}
                            onChange={(ev) =>
                              handleChange(ev.target.value, "isRecurring")
                            }
                          >
                            <option value="NEVER">Never</option>
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="MONTHLY">Monthly</option>
                          </Select>
                        </div>
                      </div>
                      <div className="date-div">
                        <h3>Date</h3>
                        <div className="input-text-input">
                          <Input
                            id="date-time-input"
                            placeholder="Select Date and Time"
                            type="datetime-local"
                            width="15.2vw"
                            color="white"
                            value={poster.startDate}
                            onChange={(ev) =>
                              handleChange(ev.target.value, "startDate")
                            }
                          />
                          <h3>to</h3>
                          <Input
                            id="date-time-input"
                            placeholder="Select Date and Time"
                            type="datetime-local"
                            width="15.2vw"
                            color="white"
                            value={poster.endDate}
                            onChange={(ev) =>
                              handleChange(ev.target.value, "endDate")
                            }
                          />
                        </div>
                      </div>
                      <div className="link-div">
                        <h3>Link</h3>
                        <Input
                          placeholder="Enter Link"
                          value={poster.link}
                          onChange={(ev) =>
                            handleChange(ev.target.value, "link")
                          }
                        />
                      </div>
                      <div className="desc-div">
                        <h3>Description</h3>
                        <Textarea
                          id="description-input"
                          placeholder="Enter Description"
                          wordBreak="break-word"
                          resize="none"
                          value={poster.description}
                          onChange={(ev) =>
                            handleChange(ev.target.value, "description")
                          }
                        />
                      </div>
                      <div className="save-div">
                        <div>
                          <h3>potato</h3>
                          <Button
                            onClick={onSaveSelectTags}
                            className={"save-button"}
                            style={{ backgroundColor: "var(--dark-purple100)" }}
                            isDisabled={
                              isLoading || !poster.title || !posterSrc
                            }
                          >
                            Save and Select Tags
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
            </ModalContent>
          </div>
        </Modal>
      )}
    </>
  );
}
