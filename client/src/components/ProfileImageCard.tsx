import { useRecoilState } from "recoil";
import {
  modalOpenState,
  posterState,
  profileState,
  refreshState,
} from "./atoms/atoms";
import { useCallback, useEffect, useState } from "react";
import "../styles/ImageCard.css";
import "../styles/Modal.css";
import axios from "axios";
import ViewPosterModal from "./ViewPosterModal";
import PopupModal from "./PopupModal";
import CreateImageModal from "./CreateImageModal";

interface ImageCardProps {
  title: string;
  content: string;
  startDate: number[];
  endDate?: number[];
  location?: string;
  link?: string;
  description?: string;
  tags?: Set<string>;
  recurs: string;
  id: string;
  created: boolean;
}

export const ProfileImageCard: React.FC<ImageCardProps> = ({
  title,
  content,
  startDate,
  endDate,
  location,
  link,
  description,
  tags,
  recurs,
  id,
  created,
}) => {
  const listMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const listWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [modalOpen, setModalOpen] = useState<string>("");
  const [, setEditModal] = useRecoilState(modalOpenState);
  const handleViewPoster = useCallback(() => {
    setModalOpen("viewImage");
  }, []);
  const monthName =
    listMonths[new Date(JSON.stringify(startDate[1])).getMonth()];
  const month = monthName.substring(0, 3);
  const fullStartDate = `${monthName} ${startDate[2]}, ${startDate[0]}`;
  let fullEndDate = null;
  if (endDate) {
    fullEndDate = `${monthName} ${endDate[2]}, ${endDate[0]}`;
  }
  const weekday = listWeekdays[new Date(fullStartDate).getDay()];
  const [userId] = useRecoilState(profileState);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [refresh, setRefresh] = useRecoilState<boolean>(refreshState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [poster, setPoster] = useRecoilState(posterState);

  const fetchSaved = async (profile: { id: string }, posterId: string) => {
    try {
      //fetch savedposters
      const savedPosters = await fetch(
        "http://localhost:8080/users/savedPosters/" + profile.id
      );
      //if poster in saved , set class to clicked
      if (savedPosters.ok) {
        const posterSet = await savedPosters.json();
        //if poster id passed in is among saved posts
        const clicked = posterSet.data.some((poster) => poster.id === posterId);
        //handles settles isClicked to false when necessary too
        setIsClicked(clicked);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getUserCreated = async () => {
    const createdResp = await fetch(
      "http://localhost:8080/users/createdPosters/" + profile.id
    );
    if (createdResp.ok) {
      const created = await createdResp.json();
      //get each poster given id then set created
      const newCreatedPosters = [];
      for (const poster of created.data) {
        const postersResp = await fetch(
          "http://localhost:8080/posters/" + poster.id
        );
        if (postersResp.ok) {
          const posterData = await postersResp.json();
          newCreatedPosters.push(posterData.data);
        }
      }
      setProfile({ ...profile, createdPosters: newCreatedPosters });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSaved(userId, id);
      // setPoster({
      //   title: title,
      //   content: content,
      //   startDate: startDate, //fix this later
      //   endDate: endDate,
      //   location: location,
      //   link: link,
      //   description: description,
      //   tags: tags,
      //   recurs: recurs,
      //   id: id,
      //   created: created,
      // });
    }
  }, [refresh, userId, isClicked]);

  const fetchSavedOnClose = async () => {
    if (userId) {
      await fetchSaved(userId, id);
    }
  };

  const onClickView = async () => {
    setModalOpen("");
    await fetchSavedOnClose();
    await getUserCreated();
  };

  const onClickHeart = async (event) => {
    // stops the click event from propagating to its parent
    event.stopPropagation();
    const heartIcon = document.querySelector(`.heart-icon-prof`);
    if (heartIcon) {
      //if alredy clicked, un fill, un save
      if (isClicked) {
        //unfill
        setIsClicked(false);
        //unsave
        try {
          //add to database
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const url =
            "http://localhost:8080/users/unsavePoster?posterId=" +
            id +
            "&userId=" +
            userId.id;
          const res = await axios.put(url, null, config);
          setRefresh(!refresh);
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
        //if not yet clicked, fill and save
      } else {
        //fill
        setIsClicked(true);

        //save
        try {
          //add to database
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const url =
            "http://localhost:8080/users/savePoster?posterId=" +
            id +
            "&userId=" +
            userId.id;
          const res = await axios.put(url, null, config);
          setRefresh(!refresh);
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
  };

  // parses the date from the fetched poster object into format that can be displayed on image card
  function time(date: number[]) {
    let minutes = JSON.stringify(date[4]);
    if (date[4] === 0) {
      minutes = "00";
    }
    if (date[3] > 12) {
      return date[3] - 12 + ":" + minutes + " PM";
    } else if (date[3] === 0) {
      return "12:" + minutes + " AM";
    } else {
      return date[3] + ":" + minutes + " AM";
    }
  }

  const startTime = time(startDate);
  let endTime = null;
  if (endDate) {
    endTime = time(endDate);
  }
  const day = startDate[2];

  const onDelete = async (event) => {
    //open popup modal
    event.stopPropagation();
    setModalOpen("popup");
  };

  const onClickEdit = (e) => {
    e.stopPropagation();
    setEditModal("createImage");
    //set poster state to poster associated w the porfile image card
  };

  return (
    <>
      {modalOpen == "popup" && (
        <PopupModal posterID={id} onTab={true} onCloseModal={onClickView} />
      )}
      {modalOpen == "createImage" && <CreateImageModal />}
      <div className="profile-card" onClick={handleViewPoster} id={id}>
        <div className="card-backing">
          <img
            src={content}
            alt={title}
            loading="lazy"
            className="poster-image"
          />
        </div>
        <div className="profile-overlay">
          <div className="profile-top-info">
            <div className="profile-month-date">
              <p id="profile-month">{month}</p>
              <p id="profile-day">{day}</p>
            </div>
            <div className="profile-weekday-time">
              <p id="profile-weekday">{weekday}</p>
              <p id="profile-time">
                {startTime}
                {endTime && "-" + endTime}
              </p>
            </div>
            {userId && (
              <>
                <div
                  className="icons"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    position: "relative",
                    left: "1vw",
                    height: "50%",
                    justifyContent: "right",
                    width: "fit-content",
                  }}
                >
                  <div
                    className={`heart-icon-prof ${isClicked ? "clicked" : ""}`}
                    id={id}
                    onClick={(event) => onClickHeart(event)}
                    style={{
                      width: "1.8vw",
                      height: "1.8vw",
                      boxSizing: "content-box",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                      left: ".2vw",
                    }}
                  ></div>

                  {created && (
                    <>
                      <div
                        className="edit-icon"
                        style={{
                          width: "2.5vw",
                          height: "2.5vw",
                          boxSizing: "content-box",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          position: "relative",
                        }}
                        onClick={(e) => onClickEdit(e)}
                      ></div>
                      <div
                        className="close-icon"
                        style={{
                          width: "2vw",
                          height: "2vw",
                          boxSizing: "content-box",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          position: "relative",
                        }}
                        onClick={(e) => onDelete(e)}
                      ></div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <p id="profile-title">{title}</p>
        </div>
        {modalOpen === "viewImage" && (
          <ViewPosterModal
            onClose={() => onClickView()}
            setClicked={setIsClicked}
            title={title}
            path={content}
            startDate={fullStartDate}
            endDate={fullEndDate!}
            startTime={startTime}
            endTime={endTime!}
            location={location!}
            link={link!}
            description={description!}
            tags={tags!}
            recurs={recurs}
            id={id}
          />
        )}
      </div>
    </>
  );
};
