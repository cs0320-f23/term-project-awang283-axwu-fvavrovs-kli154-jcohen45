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

export default function TagsModal({ onClose }) {
  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay />
          <ModalContent
            minW={"70%"}
            minH={"80%"}
            fontFamily={"quicksand, sans-serif"}
          >
            <ModalHeader
              display={"flex"}
              justifyContent={"space-around"}
              color={"var(--chakra-colors-purple-800)"}
            >
              Tags
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody
              display={"flex"}
              // justifyContent={"space-around"}
              color={"var(--chakra-colors-purple-800)"}
            >
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
                  <Button color={"white"} onClick={onClose} margin={"2%"}>
                    Upload Poster
                  </Button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
