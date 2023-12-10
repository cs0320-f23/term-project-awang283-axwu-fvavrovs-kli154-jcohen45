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

export default function TagsModal({ onClose, onBack }) {
  return (
    <div className="tags-container">
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
        <Button onClick={onBack} className={"final-upload-button"}>
          Back
        </Button>
        <Button className="final-upload-button" onClick={onClose}>
          Upload Poster
        </Button>
      </div>
    </div>
  );
}
