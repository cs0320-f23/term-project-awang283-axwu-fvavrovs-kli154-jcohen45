import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import "../styles/Modal.css";

export default function EditProfileModal({ onClose }) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay className="modal-overlay" />
      <ModalContent>
        <ModalCloseButton
          className="close-button"
          style={{ backgroundColor: "var(--dark-purple100)", color: "white" }}
          onClick={onClose}
        />
        <ModalHeader className="modal-header">Edit Profile</ModalHeader>
        <ModalBody className="modal-body">
          <div></div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
