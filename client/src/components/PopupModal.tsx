import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalOpenState, posterState, profileState } from "./atoms/atoms";
import axios from "axios";

export default function PopupModal({ posterID, setPosterSrc }) {
  const profile = useRecoilValue(profileState);
  const setPoster = useSetRecoilState(posterState);
  const [modalOpen, setModalOpen] = useRecoilState<string>(modalOpenState);

  //user wants to delete draft
  const onYes = async () => {
    //if poster state has ID
    if (posterID != null) {
      //yes? delete from database(posterID, userID)
      try {
        //add to database
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log(posterID);
        const url = "http://localhost:8080/posters/delete/" + posterID;
        const formData = new FormData();
        formData.append("id", posterID);
        formData.append("userId", profile.id);

        const res = await axios.post(url, formData, config);

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
    //sets global state to nothing (no more draft)
    setPoster({});
    setPosterSrc("");

    //goes to whatever page user was on (no more modal)
    setModalOpen("");
  };

  //user does not want to delete draft
  const onNo = () => {
    //go back to create image
    setModalOpen("createImage");
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
              <Button onClick={() => onYes()} color={"white"} width={"40%"}>
                Yes
              </Button>
              <Button onClick={() => onNo()} color={"white"} width={"40%"}>
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
