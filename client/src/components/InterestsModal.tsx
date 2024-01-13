import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { classNameTag, fetchTags } from "../functions/fetch";
import { profileState } from "./atoms/atoms";
import { useRecoilState } from "recoil";
import "../styles/Modal.css";

export default function InterestsModal({ createUser }) {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [profile, setProfile] = useRecoilState(profileState);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const tagsData = await fetchTags();
        setAllTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchAllTags();
  }, []);

  const onClick = (tag: string) => {
    // if in tags list, take out
    setTags((prevTags) => {
      // using functional form of setTags so that onClick is updating the actual latest state of tags; otherwise always a step behind
      const updatedTags = new Set(prevTags); // Create a new set from the previous tags

      if (updatedTags.has(tag)) {
        updatedTags.delete(tag); // If the tag exists, remove it from the set
      } else {
        updatedTags.add(tag); // If the tag doesn't exist, add it to the set
      }

      console.log(updatedTags);
      return updatedTags; // Return the updated set
    });
  };

  const addToProfile = async () => {
    //get tags
    const interests = Array.from(tags);
    // Append interests to the profile object
    const updatedProfile = {
      ...profile,
      interests: interests,
    };
    setProfile(updatedProfile);
    return await createUser(updatedProfile);
  };
  return (
    <Modal
      isOpen={true}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      <div className="modal-font">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="modal-header">
            Select Up to 5 Interests
          </ModalHeader>
          <ModalBody>
            <div className="tags-container" style={{ width: "100%" }}>
              <div className="tags-div">
                {allTags.map((tag, index) => {
                  const isSelected = tags.has(tag);
                  const tagClass = isSelected
                    ? "selected-tag" + " " + classNameTag(index)
                    : classNameTag(index);

                  return (
                    <div
                      key={tag}
                      className={tagClass}
                      onClick={() => onClick(tag)}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
              <div className="final-save-div" style={{ margin: "1vw 0vw 1vw" }}>
                <Button
                  className="final-upload-button"
                  onClick={addToProfile}
                  style={{ margin: "0vw 8vw 1vw" }}
                  isDisabled={tags.size < 1 || tags.size > 5}
                >
                  Select Interests
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </div>
    </Modal>
  );
}
