import { Button } from "@chakra-ui/react";
import "../styles/Modal.css";
import { useEffect, useState } from "react";

export default function TagsModal({ onClose, onBack }) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch("http://localhost:8080/posters/alltags");
        if (response.ok) {
          const tagsData = await response.json();
          setTags(tagsData);
        } else {
          throw new Error("Failed to fetch tags");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        // Handle error scenario
      }
    }
    fetchTags();
  }, []);

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
      <div className="tags-container">
        <div className="tags-div">
          {tags.map((tag, index) => {
            return (
              <div key={tag} className={classNameTag(index)}>
                {tag}
              </div>
            );
          })}
          {/* </div> */}
        </div>
        <div className="final-save-div">
          <Button onClick={onBack} className={"final-upload-button"}>
            Back
          </Button>
          <Button className="final-upload-button" onClick={onClose}>
            Upload Poster
          </Button>
        </div>
      </div>
    </>
  );
}
