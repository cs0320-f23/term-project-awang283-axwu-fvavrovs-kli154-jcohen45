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

export default function CreateImageModal({ onClose }) {
  const [showTags, setShowTags] = useState<boolean>(false);
  const onSaveSelectTags = () => {
    setShowTags(true);
  };

  const onBack = () => {
    setShowTags(false);
  };
  const [posterFile, setPosterFile] = useState<File>();
  const [posterSrc, setPosterSrc] = useState<string>("");

  const createImgurFromFile = async (file: File) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      let url = "http://localhost:8080/posters/create/imgur";
      let formData = new FormData();
      formData.append("content", file);
      console.log("Before axios request");
      const res = await axios.post(url, formData, config);
      console.log("After axios request");
      return Promise.resolve(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  const createImgurFromLink = async (link: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let url = "http://localhost:8080/posters/create/fromLink";
      let formData = new FormData();
      formData.append("content", link);
      console.log("Before axios request");
      const res = await axios.post(url, link, config);
      console.log("After axios request");
      setImgUrl(res.data.data.content);
      setPosterSrc(res.data.data.content);
      console.log();
      console.log(res.data.data.content);
      return Promise.resolve(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  const handlePosterUpload = async (target: EventTarget & HTMLInputElement) => {
    if (target.files) {
      const file = target.files[0]; //getting the file object
      setPosterFile(file);
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size, "bytes");

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

      const output = await createImgurFromFile(file);
      setImgUrl(output.content);
      console.log(output);
      console.log(output.content);
    }
  };

  const [imgUrl, setImgUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const [repeats, setRepeats] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

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
                  <TagsModal onClose={onClose} onBack={onBack} />
                ) : (
                  <div className="input-fields">
                    <div>
                      <h3>Image</h3>
                      <div className="input-text-input">
                        <Input
                          id="image-url"
                          placeholder="Image URL"
                          value={imgUrl}
                          onChange={(ev) => setImgUrl(ev.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              createImgurFromLink(imgUrl);
                            }
                          }}
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
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                      ></Input>
                    </div>
                    <div className="location-div">
                      <div>
                        <h3>Location</h3>
                        <Input
                          placeholder="Enter Location"
                          width="23.4vw"
                          value={location}
                          onChange={(ev) => setLocation(ev.target.value)}
                        />
                      </div>
                      <div>
                        <h3>Repeats</h3>
                        <Select
                          placeholder="Repeats"
                          id="recur-select"
                          width="8vw"
                          color="white"
                          value={repeats}
                          onChange={(ev) => setRepeats(ev.target.value)}
                        >
                          <option value="Never">Never</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
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
                          value={startDateTime}
                          onChange={(ev) => setStartDateTime(ev.target.value)}
                        />
                        <h3>to</h3>
                        <Input
                          id="date-time-input"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          width="15.2vw"
                          color="white"
                          value={endDateTime}
                          onChange={(ev) => setEndDateTime(ev.target.value)}
                        />
                      </div>
                    </div>
                    <div className="link-div">
                      <h3>Link</h3>
                      <Input
                        placeholder="Enter Link"
                        value={eventLink}
                        onChange={(ev) => setEventLink(ev.target.value)}
                      />
                    </div>
                    <div className="desc-div">
                      <h3>Description</h3>
                      <Textarea
                        id="description-input"
                        placeholder="Enter Description"
                        wordBreak="break-word"
                        resize="none"
                        value={desc}
                        onChange={(ev) => setDesc(ev.target.value)}
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
