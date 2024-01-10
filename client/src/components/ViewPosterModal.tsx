import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import "../styles/Modal.css";
import { useEffect, useState } from "react";

interface viewProps {
  onClose: () => void;
  title: string;
  path: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  link: string;
  description: string;
  tags: Set<string>;
  recurs: string;
  id: string;
}

export default function ViewPosterModal({
  onClose,
  title,
  path,
  date,
  startTime,
  endTime,
  location,
  link,
  description,
  tags,
  recurs,
  id,
}: viewProps) {
  const [weekday, month, day] = date.split(" ");
  const [name, setName] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(name);
  }, [name]);

  const classNameTag = (index: number) => {
    if (index % 3 == 0) {
      return "magenta-tag";
    } else if (index % 3 == 1) {
      return "green-tag";
    } else {
      return "blue-tag";
    }
  };

  const getUser = async () => {
    //use poster id to get user id
    try {
      const posterRes = await fetch("http://localhost:8080/posters/" + id);
      if (posterRes.ok) {
        const poster = await posterRes.json();
        if (poster.data.userId) {
          const userRes = await fetch(
            "http://localhost:8080/users/" + poster.data.userId
          );
          if (userRes.ok) {
            const user = await userRes.json();
            setName(user.data.name);
            setPicture(user.data.picture);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <div className="modal-font">
          <ModalOverlay className="modal-overlay" />
          <ModalContent
            display={"flex"}
            flexFlow={"column"}
            alignContent={"center"}
            justifyContent={"space-around"}
            minH="60%"
            className="modal-content"
          >
            <ModalCloseButton className="close-button" onClick={onClose} />
            <ModalBody className="modal-body" flexDirection={"row"}>
              <Box className="view-image" overflowY={"scroll"} id={id}>
                <img src={path}></img>
                <div
                  className="heart-icon"
                  style={{
                    position: "absolute",
                    top: "5%",
                    left: "42%",
                    width: "20px",
                    height: "20px",
                    backgroundImage: `url('public/heart-svgrepo-com.svg')`,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "10%",
                    padding: "1%",
                    boxSizing: "content-box",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }} //partially fill on hover, fully fill on click
                ></div>
              </Box>
              <div className="view-info">
                <p id="view-title">{title}</p>

                <div className="poster-details">
                  {picture && name && (
                    <div
                      className="info-row"
                      style={{
                        marginBottom: "2%",
                      }}
                    >
                      {picture && (
                        <img
                          className="field-name"
                          style={{
                            width: "8%",
                            marginRight: "3%",
                          }}
                          src={picture}
                        />
                      )}
                      {name && (
                        <div id="field-text" style={{ paddingTop: "1%" }}>
                          {name}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="info-row">
                    <div className="field-name">When</div>
                    <div id="field-text">
                      {weekday + ", " + month + " " + day + ", " + startTime}
                      {endTime && "-" + endTime}
                    </div>
                  </div>
                  {recurs && (
                    <div className="info-row">
                      <div className="field-name">Recurs</div>
                      <div id="field-text">{recurs.toLowerCase()}</div>
                    </div>
                  )}

                  {location && (
                    <div className="info-row">
                      <div className="field-name">Where</div>
                      <div id="field-text">{location}</div>
                    </div>
                  )}
                  {link && (
                    <div className="info-row">
                      <div className="field-name">Link</div>
                      <div id="field-text">
                        <a href={link} id="poster-link" target="_blank">
                          {link}
                        </a>
                      </div>
                    </div>
                  )}
                  {tags.length > 0 && (
                    <div className="info-row">
                      <div className="field-name">Tags</div>
                      <div id="field-text">
                        {tags.map((tag, index) => {
                          return (
                            <div key={tag} className={classNameTag(index)}>
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div id="description">
                  {description && <p id="description-field">Description</p>}
                  {description && (
                    <div id="description-text">{description}</div>
                  )}
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
