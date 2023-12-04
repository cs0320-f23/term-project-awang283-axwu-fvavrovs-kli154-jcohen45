// import React, { useState } from "react";

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

export default function CreateImageModal(onClose) {
  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay />
          <ModalContent minW={"70%"} minH={"80%"}>
            <ModalHeader display={"flex"} justifyContent={"space-around"}>
              Upload a Poster
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"}>
              <div className="image-container"></div>
              <div className="input-fields">
                <h3>Image</h3>
                <div className="image-upload-content">
                  <Input placeholder="Image URL"></Input>
                  <Button
                    bgColor={"var(--chakra-colors-purple-800)"}
                    color={"var(--chakra-colors-purple-200)"}
                  >
                    Upload
                  </Button>
                </div>
                <h3>Title</h3>
                <Input placeholder="Enter Title" marginBottom={"2%"}></Input>

                <h3>Location</h3>
                <Input placeholder="Enter Location" />
                <div className="location-date-titles">
                  <h3>From</h3>
                  <h3>To</h3>
                  <h3>Repeats</h3>
                </div>
                <div className="location-date">
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    maxW={"30%"}
                  />
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    maxW={"30%"}
                  />
                  <Select placeholder="Repeats" maxW={"30%"}>
                    <option value="Never">Never</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </Select>
                </div>
                <h3>Description</h3>
                <Input minH={"35%"} />
              </div>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
