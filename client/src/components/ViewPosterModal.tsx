import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import "../styles/Modal.css";

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
  tags: string[];
  recurs: string;
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
}: viewProps) {
  const [weekday, month, day] = date.split(" ");

  const classNameTag = (index: number) => {
    if (index % 3 == 0) {
      return "magenta-tag";
    } else if (index % 3 == 1) {
      return "green-tag";
    } else {
      return "blue-tag";
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
              <div className="view-image">
                <img src={path}></img>
              </div>
              <div className="view-info">
                <p id="view-title">{title}</p>
                <div className="poster-details">
                  <div className="info-row">
                    <div className="field-name">When</div>
                    <div id="field-text">
                      {weekday + ", " + month + " " + day + ", " + startTime}
                      {endTime && "-" + endTime}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="field-name">Recurs</div>
                    <div id="field-text">{recurs.toLowerCase()}</div>
                  </div>
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
