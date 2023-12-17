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
import { useState } from "react";
import axios from "axios";
import TagsModal from "./TagsModal";

interface IPoster {
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

export default function CreateImageModal({ onClose }) {
  const [, setImgUrl] = useState<string>("");
  const [showTags, setShowTags] = useState<boolean>(false);
  const [posterSrc, setPosterSrc] = useState<string>("");
  const [poster, setPoster] = useState<IPoster>({});
  const [posterId, setPosterId] = useState<string>("");

  const handleChange = (
    value: string[] | string | Set<string>,
    property: keyof IPoster,
    callback?: () => void
  ) => {
    let updatedValue: {
      [x: string]: string[] | Set<string> | string;
    };
    if (value instanceof Set) {
      updatedValue = { [property]: Array.from(value) };

      console.log(JSON.stringify(Array.from(value)) + " updated tags");
    } else {
      updatedValue = { [property]: value };
    }
    setPoster((prevPoster) => ({
      ...prevPoster,
      ...updatedValue,
    }));
    if (callback) {
      callback();
    }
    return poster;
    // console.log(JSON.stringify(poster) + " after updated tags");
  };

  const setUserLink = async (target: EventTarget) => {
    //on change
    const inputElement = target as HTMLInputElement;

    //setURL
    setImgUrl(inputElement.value);
    console.log(inputElement.value + " imgurl");
    //if link not imgur
    //const pattern: RegExp = /^.*\.(png|jpg|jpeg)$/i;

    if (
      !inputElement.value.includes("https://i.imgur.com") // &&
      //pattern.test(inputElement.value)
    ) {
      try {
        //add to database
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = "http://localhost:8080/posters/create/fromlink";
        const formData = new FormData();
        formData.append("content", inputElement.value);
        const res = await axios.post(url, formData, config);

        setPosterSrc(inputElement.value);
        setPosterId(res.data.data.id);
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
      console.log("Before axios request");
      const res = await axios.post(url, formData, config);
      console.log("After axios request");
      setPosterId(res.data.data.id);
      return Promise.resolve(res.data.data);
    } catch (error) {
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

  const onSaveSelectTags = () => {
    setShowTags(true);
  };

  const onBack = () => {
    setShowTags(false);
  };

  const handlePosterUpload = async (target: EventTarget & HTMLInputElement) => {
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
      setImgUrl(output.content);
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay className="modal-overlay" />
          <ModalContent className="modal-content">
            <ModalHeader className="modal-header">Upload a Poster</ModalHeader>
            <ModalCloseButton className="close-button" onClick={onClose} />

            <ModalBody className="modal-body">
              <div className="create-div">
                {posterSrc ? (
                  <Box
                    className="view-image"
                    maxHeight={"76vh"}
                    overflowY={"scroll"}
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
                    poster={poster}
                    posterId={posterId}
                    handleChange={handleChange}
                  />
                ) : (
                  <div className="input-fields">
                    <div>
                      <h3>Image</h3>
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
                        <label htmlFor="image-upload" className="upload-button">
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
                      <h3>Title</h3>
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
                        onChange={(ev) => handleChange(ev.target.value, "link")}
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
    </>
  );
}
