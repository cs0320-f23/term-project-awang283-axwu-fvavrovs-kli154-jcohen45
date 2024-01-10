import { Button } from "@chakra-ui/react";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchTags } from "../functions/fetch";
import { posterSrcState, posterState, searchResultsState } from "./atoms/atoms";
import { useRecoilState } from "recoil";
import { getPosters } from "./Happenings";
import { IPoster } from "./CreateImageModal";

export default function TagsModal({
  onClose,
  onBack,
  posterId,
  handleChange,
  setShowTags,
}) {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [, setSearchResults] = useRecoilState(searchResultsState);
  const [poster, setPoster] = useRecoilState<IPoster>(posterState);
  const [, setPosterSrc] = useRecoilState(posterSrcState);

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
    setTags(new Set(poster.tags));
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

  //onclick
  const onClick = (tag: string) => {
    //if in tagslist, take out
    const updatedTags = new Set(tags); // Create a new set from the current tags

    if (updatedTags.has(tag)) {
      updatedTags.delete(tag); // If the tag exists, remove it from the set
    } else {
      updatedTags.add(tag); // If the tag doesn't exist, add it to the set
    }

    setTags(updatedTags);
    console.log(tags);
  };

  //on hit create button
  const createPoster = async () => {
    onClose();
    //reset global poster state when we nolonger need access to the draft
    setPoster({});
    //add list to poster obj w handlechange
    const newPoster = handleChange(tags, "tags", () => {});

    // console.log(JSON.stringify(newPoster) + " new poster");
    //call put endpoint
    try {
      //add to database
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = "http://localhost:8080/posters/update/" + posterId;
      const formData = new FormData();
      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      for (const key in newPoster) {
        if (newPoster[key]) {
          formData.append(key, newPoster[key]);
        }
      }
      const res = await axios.put(url, formData, config);
      getPosters().then((data) => setSearchResults(data));
      setShowTags(false);
      setPosterSrc("");
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
          <Button onClick={onBack} className={"final-upload-button"}>
            Back
          </Button>
          <Button className="final-upload-button" onClick={createPoster}>
            Create Poster
          </Button>
        </div>
      </div>
    </>
  );
}
