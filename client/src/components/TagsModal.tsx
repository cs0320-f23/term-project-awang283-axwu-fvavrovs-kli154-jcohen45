import { Button } from "@chakra-ui/react";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { classNameTag, fetchTags } from "../functions/fetch";
import {
  modalOpenState,
  posterSrcState,
  posterState,
  refreshState,
  searchResultsState,
} from "./atoms/atoms";
import { useRecoilState } from "recoil";
import { getPosters } from "./Happenings";
import { IPosterObject } from "./CreateImageModal";
import ErrorPopup from "./ErrorPopup";

interface tagsProps {
  // onClose: () => void;
  onBack: () => void;
  draftId: string;
  setShowTags: React.Dispatch<React.SetStateAction<boolean>>;
  updatePoster: (poster: IPosterObject, id: string) => Promise<unknown>;
}

export default function TagsModal({
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
  const [disabled, setDisabled] = useState<boolean>(false);
  const [errorPopup, setErrorPopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setModalOpen] = useRecoilState(modalOpenState);

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
    selectSuggestedTags(poster.tags!);
  }, [poster]);

  useEffect(() => {
    // console.log("Poster updated:", poster);
    const getPoster = async () => {
      try {
        const url = draftId
          ? "http://localhost:8080/posters/" + draftId
          : "http://localhost:8080/posters/" + poster.id;
        const res = await fetch(url);
        // console.log(res);
        if (res.ok) {
          const posterData = await res.json();
          if (posterData.message != "Poster not found") {
            return false;
          } else {
            try {
              const url = draftId
                ? "http://localhost:8080/drafts/" + draftId
                : "http://localhost:8080/drafts/" + poster.id;
              const res = await fetch(url);
              // console.log(res);
              if (res.ok) {
                const posterData = await res.json();
                if (posterData.message != "Poster not found") {
                  return true;
                }
              }
            } catch (error) {
              JSON.stringify(error);
              return undefined;
            }
          }
        }
      } catch (error) {
        JSON.stringify(error);
        return undefined;
      }
    };
    const getIsDraft = async () => {
      const isDraft = await getPoster();
      setPoster({ ...poster, isDraft: isDraft });
    };
    getIsDraft();
  }, [draftId, poster, setPoster]);

  // const handleChange = (
  //   value: string[] | string | Set<string>,
  //   property: keyof IPosterObject,
  //   callback?: () => void
  // ) => {
  //   setPoster((prevPoster) => {
  //     const updatedValue =
  //       value instanceof Set
  //         ? { [property]: Array.from(value) }
  //         : { [property]: value };
  //     const newPoster = { ...prevPoster, ...updatedValue };

  //     if (callback) {
  //       callback();
  //     }

  //     console.log("Updated Poster in handleChange:", newPoster);
  //     return newPoster;
  //   });
  // };

  function selectSuggestedTags(currTags: Set<string>) {
    setTags((prevTags) => {
      const updatedTags = new Set(prevTags);
      currTags.forEach((tag) => updatedTags.add(tag));
      return updatedTags;
    });
  }

  const onClick = (tag: string) => {
    setTags((prevTags) => {
      const updatedTags = new Set(prevTags);
      if (updatedTags.has(tag)) {
        updatedTags.delete(tag);
      } else {
        updatedTags.add(tag);
      }
      return updatedTags;
    });
  };

  const createPoster = async () => {
    setIsLoading(true);
    setDisabled(true);

    const updatedPoster = {
      ...poster,
      tags: Array.from(tags),
    };

    // setPoster(updatedPoster);
    // console.log("updated");
    // console.log(updatedPoster);
    // console.log(updatedPoster.id);
    // console.log(draftId);
    await updatePoster(
      updatedPoster,
      updatedPoster.id ? updatedPoster.id : draftId
    );

    // console.log("updated poster");
    // console.log(res1);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(draftId);
      const url =
        !poster.isDraft && draftId
          ? `http://localhost:8080/posters/update/${draftId}`
          : !poster.isDraft
          ? `http://localhost:8080/posters/update/${updatedPoster.id}`
          : draftId
          ? `http://localhost:8080/posters/create/${draftId}`
          : `http://localhost:8080/posters/create/${updatedPoster.id}`;
      const formData = new FormData();

      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      for (const key in updatedPoster) {
        if (updatedPoster[key] && key !== "tags") {
          const value = updatedPoster[key];
          if (typeof value === "string") {
            formData.append(key, value);
          }
        }
      }
      const res = !poster.isDraft
        ? await axios.put(url, formData, config)
        : await axios.post(url, formData, config);
      // console.log(res);
      setRefresh(!refresh);
      getPosters().then((data) => setSearchResults(data));
      setShowTags(false);
      setPoster({});
      setModalOpen(" ");
      setPosterSrc("");
      setIsLoading(false);
      console.log(poster);
      return Promise.resolve(res.data.data);
    } catch (error) {
      setErrorPopup(true);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  const saveDraft = () => {
    updatePoster(poster, draftId ? draftId : poster.id);
    setPoster({});
    setPosterSrc("");
    setModalOpen(" ");
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <img className="loading-gif" src="/loading.gif" />
        </div>
      )}
      {errorPopup && <ErrorPopup setClose={setErrorPopup} />}
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
          <div>
            {poster.isDraft && (
              <Button
                style={{
                  backgroundColor: "var(--dark-purple70) !important",
                  marginRight: "1vw",
                }}
                className="final-upload-button"
                onClick={saveDraft}
                disabled={disabled}
              >
                Save Draft
              </Button>
            )}
            <Button
              style={{ backgroundColor: "var(--dark-purple100)" }}
              className="final-upload-button"
              onClick={createPoster}
              disabled={disabled}
            >
              {poster.isDraft ? "Create Poster" : "Edit Poster"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
