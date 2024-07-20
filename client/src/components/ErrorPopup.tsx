import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ErrorPopup({ setClose }) {
  return (
    <Modal isOpen={true} onClose={setClose(false)}>
      <ModalOverlay className="modal-overlay" />
      <ModalContent className="modal-content" maxH={"5vh"}>
        <ModalCloseButton
          className="close-button"
          onClick={setClose(false)}
          style={{ backgroundColor: "var(--dark-purple100)" }}
        />
        <ModalBody maxHeight={"50%"} maxH={"5vh"}>
          <h1>Sorry, an error occurred. Please try again later!</h1>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
