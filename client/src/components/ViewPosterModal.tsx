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
  time: string;
  location: string;
  link: string;
  description: string;
  tags: string[];
}

export default function ViewPosterModal({
  onClose,
  title,
  path,
  date,
  time,
  location,
  link,
  description,
  tags,
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
                      {tags.map((tag, index) => {
                        return (
                          <div key={tag} className={classNameTag(index)}>
                            {tag}
                          </div>
                        );
                      })}
                      {/* <div className="magenta-tag">Free Food</div>
                      <div className="green-tag">Party</div>
                      <div className="blue-tag">Outdoor</div>
                      <div className="magenta-tag">Free Food</div>
                      <div className="green-tag">Party</div> */}
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
