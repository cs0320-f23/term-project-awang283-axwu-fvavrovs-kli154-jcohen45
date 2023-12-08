import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import "../styles/Modal.css";

export default function ViewPosterModal({
  onClose,
  title,
  path,
  date,
  time,
  location,
  link,
  description,
}) {
  const [weekday, month, day] = date.split(" ");
  return (
    <>
      <Modal isOpen={true} onClose={onClose} className="modal">
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
                  <div className="poster-field">
                    <p>Date</p>
                    {time && <p>Time</p>}
                    {location && <p>Where</p>}
                    {link && <p>Link</p>}
                    <p>Tags</p>
                  </div>
                  <div className="poster-info">
                    <p>{weekday + ", " + month + " " + day}</p>
                    {time && <p>{time}</p>}
                    {location && <p>{location}</p>}
                    {link && (
                      <a href={link} id="poster-link" target="_blank">
                        {link}
                      </a>
                    )}
                    <div id="row">
                      <div className="magenta-tag">Free Food</div>
                      <div className="green-tag">Party</div>
                      <div className="blue-tag">Outdoor</div>
                      <div className="magenta-tag">Free Food</div>
                      <div className="green-tag">Party</div>
                    </div>
                  </div>
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
