import { Button } from "@chakra-ui/react";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { classNameTag, fetchTags } from "../functions/fetch";
import {
  posterSrcState,
  posterState,
  refreshState,
  searchResultsState,
} from "./atoms/atoms";
import { useRecoilState } from "recoil";
import { getPosters } from "./Happenings";
import { IPosterObject } from "./CreateImageModal";

interface tagsProps {
  onClose: () => void;
  onBack: () => void;
  draftId: string;
  setShowTags: React.Dispatch<React.SetStateAction<boolean>>;
  updatePoster: (poster: IPosterObject) => Promise<unknown>;
}

export default function TagsModal({
  onClose,
  onBack,
  draftId,
  setShowTags,
  updatePoster,
}: tagsProps) {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [, setSearchResults] = useRecoilState(searchResultsState);
  const [poster, setPoster] = useRecoilState<IPosterObject>(posterState);
  const [, setPosterSrc] = useRecoilState(posterSrcState);
  const [refresh, setRefresh] = useRecoilState(refreshState);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const tagsData = await fetchTags();
        console.log(tagsData);
        setAllTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchAllTags();
    selectSuggestedTags(poster.tags!);
    console.log(poster);
  }, []);

  const handleChange = (
    value: string[] | string | Set<string>,
    property: keyof IPosterObject,
    callback?: () => void
  ) => {
    // using functional form of setPoster so that it updates using the current stored state in poster
    setPoster((prevPoster) => {
      let updatedValue: {
        [x: string]: string[] | Set<string> | string;
      };
      if (value instanceof Set) {
        updatedValue = { [property]: Array.from(value) };
      } else {
        updatedValue = { [property]: value };
      }

      const newPoster = {
        ...prevPoster,
        ...updatedValue,
      };

      if (callback) {
        callback();
      }

      console.log(JSON.stringify(newPoster));
      return newPoster;
    });

    return poster;
  };

  function selectSuggestedTags(currTags: Set<string>) {
    //using functional form of setTags so that all suggested tags by cv api are actually selected upon mounting
    setTags((prevTags) => {
      const updatedTags = new Set(prevTags); // Create a new set from the previous tags

      for (const tag of currTags) {
        updatedTags.add(tag); // Add each tag from currTags to the updated set
      }

      return updatedTags;
    });
  }

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

  //on hit create button
  const createPoster = async () => {
    //add list to poster obj w handlechange
    const newPoster = handleChange(tags, "tags", () => {});
    // updatePoster(newPoster);

    // console.log(JSON.stringify(newPoster) + " new poster");
    //call put endpoint
    try {
      //add to database
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("printing draft id");
      console.log(draftId);
      const url = "http://localhost:8080/posters/create/" + draftId;
      // const formData = new FormData();
      console.log("tags: ");
      console.log(tags);

      // tags.forEach((tag) => {
      //   formData.append("tags[]", tag);
      // });

      // for (const key in newPoster) {
      //   if (newPoster[key] && key !== "tags") {
      //     const value = newPoster[key];
      //     if (typeof value === "string") {
      //       formData.append(key, value);
      //     }
      //   }
      // }
      // console.log(Array.from(formData));
      const res = await axios.post(url, config);
      console.log("user");
      console.log(res.data.data);
      setRefresh(!refresh);
      getPosters().then((data) => setSearchResults(data));
      setShowTags(false);
      setPosterSrc("");
      //reset global poster state when we no longer need access to the draft
      setPoster({});
      onClose();
      return Promise.resolve(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  return (
    <>
      <div className="tags-container">
        <div className="tags-div">
          {allTags.map((tag, index) => {
            const isSelected = tags.has(tag);
            const tagClass = isSelected
              ? "selected-tag" + " " + classNameTag(index)
              : classNameTag(index);

            return (
              <div key={tag} className={tagClass} onClick={() => onClick(tag)}>
                {tag}
              </div>
            );
          })}
        </div>
        <div className="final-save-div">
          <Button
            style={{ backgroundColor: "var(--dark-purple100)" }}
            onClick={onBack}
            className={"final-upload-button"}
          >
            Back
          </Button>
          <Button
            style={{ backgroundColor: "var(--dark-purple100)" }}
            className="final-upload-button"
            onClick={createPoster}
          >
            Create Poster
          </Button>
        </div>
      </div>
    </>
  );
}
