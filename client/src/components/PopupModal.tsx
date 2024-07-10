import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  modalOpenState,
  posterSrcState,
  posterState,
  profileState,
} from "./atoms/atoms";
import axios from "axios";

interface popupProps {
  posterID: string;
  onCloseModal: () => void | (() => Promise<void>);
}

export default function PopupModal({ posterID, onCloseModal }: popupProps) {
  const profile = useRecoilValue(profileState);
  const setPoster = useSetRecoilState(posterState);
  const [, setModalOpen] = useRecoilState<string>(modalOpenState);
  const [, setPosterSrc] = useRecoilState(posterSrcState);

  const getPoster = async () => {
    try {
      const url = "http://localhost:8080/posters/" + posterID;
      const res = await fetch(url);
      // console.log(res);
      if (res.ok) {
        const posterData = await res.json();
        if (posterData.message != "Poster not found") {
          return "poster";
        } else {
          try {
            const url = "http://localhost:8080/drafts/" + posterID;
            const res = await fetch(url);
            // console.log(res);
            if (res.ok) {
              const posterData = await res.json();
              if (posterData.message != "Poster not found") {
                return "draft";
              }
            }
          } catch (error) {
            return JSON.stringify(error);
          }
        }
      }
    } catch (error) {
      return JSON.stringify(error);
    }
  };

  //user wants to delete draft
  const onYes = async () => {
    // console.log("yes");
    //if poster state has ID
    if (posterID != null && posterID != "" && posterID != " ") {
      //yes? delete from database(posterID, userID)
      const isPoster = await getPoster();
      if (isPoster == "poster") {
        try {
          //add to database
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const url =
            "http://localhost:8080/posters/delete/" +
            posterID +
            "?userId=" +
            profile.id;

          const res = await axios.delete(url, config);

          //sets global state to nothing (no more draft)
          setPoster({});
          setPosterSrc("");

          //goes to whatever page user was on (no more modal)
          setModalOpen("");
          onCloseModal();

          //need to give enough time for the poster to be created + id to exist
          return Promise.resolve(res.data.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            return Promise.resolve(
              `Error in fetch: ${error.response.data.message}`
            );
          } else {
            return Promise.resolve(
              "Error in fetch: Network error or other issue"
            );
          }
        }
      } else if (isPoster == "draft") {
        try {
          //add to database
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const url = "http://localhost:8080/drafts/delete/" + posterID;

          const res = await axios.delete(url, config);

          //sets global state to nothing (no more draft)
          setPoster({});
          setPosterSrc("");

          //goes to whatever page user was on (no more modal)
          setModalOpen("");
          onCloseModal();

          //need to give enough time for the poster to be created + id to exist
          return Promise.resolve(res.data.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            return Promise.resolve(
              `Error in fetch: ${error.response.data.message}`
            );
          } else {
            return Promise.resolve(
              "Error in fetch: Network error or other issue"
            );
          }
        }
      }
    }
    //if no image was ever uploaded:
    //sets global state to nothing (no more draft)
    setPoster({});
    setPosterSrc("");

    //goes to whatever page user was on (no more modal)
    setModalOpen("");
  };

  //user does not want to delete draft
  const onNo = () => {
    // setModalOpen("");
    // TODO send a put req to save the draft
    // close the modal and return to the page -
    onCloseModal();
  };

  return (
    <Modal isOpen={true} onClose={() => false}>
      <ModalOverlay className="modal-overlay" />
      <ModalContent className="modal-content" maxH={"5vh"}>
        <ModalBody maxHeight={"50%"} maxH={"5vh"}>
          <div
            className="popup-content"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <h1> Are you sure you want to delete this poster?</h1>
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "5%",
              }}
            >
              <Button
                onClick={() => onYes()}
                backgroundColor={"var(--dark-purple100"}
                color={"white"}
                width={"40%"}
              >
                Yes
              </Button>
              <Button
                onClick={() => onNo()}
                backgroundColor={"var(--dark-purple100"}
                color={"white"}
                width={"40%"}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
