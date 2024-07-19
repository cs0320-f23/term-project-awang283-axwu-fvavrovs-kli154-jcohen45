import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

export default function ErrorPopup() {
  return (
    <Modal isOpen={true} onClose={() => false}>
      <ModalOverlay className="modal-overlay" />
      <ModalContent className="modal-content" maxH={"5vh"}>
        <ModalBody maxHeight={"50%"} maxH={"5vh"}>
          <h1>Sorry, an error occurred. Please try again later!</h1>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
