import React, { useState } from "react";
import { DatePicker } from "@orange_digital/chakra-datepicker";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function CreateImageModal() {
  const [isOpen, setIsOpen] = useState(true);
  function handleClose(): void {
    setIsOpen(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="modal-font">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload a Poster</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DatePicker initialValue={new Date()} />
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
