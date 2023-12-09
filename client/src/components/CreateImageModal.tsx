import {
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
import { create } from "@mui/material/styles/createTransitions";

const createImgurLink = async (file: File) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    let url = "http://localhost:3232/create/imgur?content=" + file;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error in fetch");
    }
    const resJSON = await response.json();
    return Promise.resolve(resJSON.result);
  } catch (error) {
    return Promise.resolve(`Error in fetch`);
  }
};

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

  const handlePosterUpload = async (target: EventTarget & HTMLInputElement) => {
    if (target.files) {
      const file = target.files[0];
      setPosterFile(file);
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size, "bytes");

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
          if (e.target && typeof e.target.result === "string") {
            setPosterSrc(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }

      console.log(createImgurLink(posterFile!));
    }
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay className="modal-overlay" />
          <ModalContent className="modal-content">
            <ModalHeader className="modal-header">Upload a Poster</ModalHeader>
            <ModalCloseButton className="close-button" onClick={onClose} />

            <ModalBody
              className="modal-body"
              minHeight={"90%"}
              maxHeight={"90%"}
            >
              {showTags ? (
                <div className="tags-div">
                  <div className="image-container"></div>
                  <div className="tags-container">
                    {/* TODO map list of all tags from database */}
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="magenta-tag">Free Food</div>
                    <div className="green-tag">Party</div>
                    <div className="blue-tag">Outdoor</div>
                    <div className="final-save-div">
                      <Button
                        onClick={onBack}
                        className={"final-upload-button"}
                      >
                        Back
                      </Button>
                      <Button className="final-upload-button" onClick={onClose}>
                        Upload Poster
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="create-div">
                  {posterFile ? (
                    <div className="view-image">
                      <img src={posterSrc} id=""></img>
                    </div>
                  ) : (
                    <div className="image-container"></div>
                  )}
                  <div className="input-fields">
                    <div>
                      <h3>Image</h3>
                      <div className="image-upload-content">
                        <Input placeholder="Image URL"></Input>
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
                      <Input placeholder="Enter Title"></Input>
                    </div>
                    <div className="location-div">
                      <div>
                        <h3>Location</h3>
                        <Input placeholder="Enter Location" width="23.4vw" />
                      </div>
                      <div>
                        <h3>Repeats</h3>
                        <Select
                          placeholder="Repeats"
                          id="recur-select"
                          width="8vw"
                          color="white"
                        >
                          <option value="Never">Never</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </Select>
                      </div>
                    </div>
                    <div className="date-div">
                      <div>
                        <h3>From</h3>
                        <Input
                          id="date-time-input"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          width="15.7vw"
                          color="white"
                        />
                      </div>
                      <div>
                        <h3>To</h3>
                        <Input
                          id="date-time-input"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          width="15.7vw"
                          color="white"
                        />
                      </div>
                    </div>
                    <div className="link-div">
                      <h3>Link</h3>
                      <Input placeholder="Enter Link" />
                    </div>
                    <div className="desc-div">
                      <h3>Description</h3>
                      <Textarea
                        id="description-input"
                        placeholder="Enter Description"
                        wordBreak="break-word"
                        resize="none"
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
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
