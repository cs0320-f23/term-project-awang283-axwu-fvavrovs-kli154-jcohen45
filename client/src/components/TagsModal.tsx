import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import "../styles/Modal.css";

export default function TagsModal({ onClose }) {
  return (
    <>
      {/* <Modal isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay className="modal-overlay" />
          <ModalContent className="modal-content">
            <ModalHeader className="modal-header">Tags</ModalHeader>
            <ModalCloseButton className="close-button" onClick={onClose} />
            <ModalBody className="modal-body"> */}
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
            <Button className="upload-button" onClick={onClose}>
              Upload Poster
            </Button>
          </div>
        </div>
      </div>
      {/* </ModalBody>
          </ModalContent>
        </div>
      </Modal> */}
    </>
  );
}
