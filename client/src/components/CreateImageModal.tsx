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
} from "@chakra-ui/react";
import "../styles/Modal.css";
import { useState } from "react";
import TagsModal from "./TagsModal";

export default function CreateImageModal({ onClose }) {
  const [showTags, setShowTags] = useState<boolean>(false);
  const onNext = () => {
    //setModalState("addTags"); //TODO nicer transition
    setShowTags(true);
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay className="modal-overlay" />
          <ModalContent className="modal-content" maxHeight={"95%"}>
            <ModalHeader className="modal-header">Upload a Poster</ModalHeader>
            <ModalCloseButton className="close-button" onClick={onClose} />

            <ModalBody className="modal-body">
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
                    <div className="save-btn">
                      <Button className="final-upload-button" onClick={onClose}>
                        Upload Poster
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="create-div">
                  <div className="image-container"></div>
                  <div className="input-fields">
                    <div>
                      <h3>Image</h3>
                      <div className="image-upload-content">
                        <Input placeholder="Image URL"></Input>
                        <Button className="upload-button">Upload</Button>
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
                      <Input
                        id="description-input"
                        placeholder="Enter Description"
                      />
                    </div>
                    <div className="save-btn">
                      <Button onClick={onNext} className={"save-button"}>
                        Save and Select Tags
                      </Button>
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
