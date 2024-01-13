import "../styles/Profile.css";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import Masonry from "masonry-layout";
import { IPoster } from "./CreateImageModal";
import imagesLoaded from "imagesloaded";
import { ImageCard } from "./Happenings";

export default function Profile() {
  const [profile] = useRecoilState(profileState);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [createdPosters, setCreatedPosters] = useState<IPoster[]>([]);
  const [savedPosters, setSavedPosters] = useState<IPoster[]>([]);

  useEffect(() => {
    // Check if profile is not null before trying to access properties
    if (profile) {
      getUserCreated();
      getUserLikes();
    }
  }, [profile]);

  useEffect(() => {
    imagesLoaded(`.saved-grid`, function () {
      new Masonry(`.saved-grid`, {
        columnWidth: 34,
        itemSelector: ".image-card",
        gutter: 23,
      });
    });
    imagesLoaded(`.created-grid`, function () {
      new Masonry(`.created-grid`, {
        columnWidth: 34,
        itemSelector: ".image-card",
        gutter: 23,
      });
    });
  }, [createdPosters, savedPosters]);

  const getUserLikes = async () => {
    const likesResp = await fetch(
      "http://localhost:8080/users/savedPosters/" + profile.id
    );
    if (likesResp.ok) {
      const likes = await likesResp.json();
      setSavedPosters(likes.data);
      setLikeCount(likes.data.length);
    }
  };

  const getUserCreated = async () => {
    const createdResp = await fetch(
      "http://localhost:8080/users/createdPosters/" + profile.id
    );
    if (createdResp.ok) {
      const created = await createdResp.json();
      setCreatedCount(created.data.length);
      //get each poster given id then set created
      created.data.map(async (poster) => {
        const postersResp = await fetch(
          "http://localhost:8080/posters/" + poster.id
        );
        if (postersResp.ok) {
          const poster = await postersResp.json();
          setCreatedPosters((prevCreatedPosters) => [
            ...prevCreatedPosters,
            poster.data,
          ]);
        }
      });
    }
  };

  const handleTabChange = () => {
    // Explicitly trigger Masonry layout update when the tab becomes visible
    imagesLoaded(`.saved-grid`, function () {
      new Masonry(`.saved-grid`, {
        columnWidth: 34,
        itemSelector: ".image-card",
        gutter: 23,
      });
    });
    imagesLoaded(`.created-grid`, function () {
      new Masonry(`.created-grid`, {
        columnWidth: 34,
        itemSelector: ".image-card",
        gutter: 23,
      });
    });
  };

  return (
    <main
      className="user-page"
      style={{ top: "6.5%", display: "flex", justifyContent: "space-between" }}
    >
      <div
        className="profile"
        style={{
          backgroundColor: "white",
          width: "25%",
          height: "85vh",
          margin: "5%",
          marginTop: "2%",
          borderRadius: "30px",
          boxShadow: "0px 3px 10px 4px rgba(63, 49, 94, 0.15)",
          position: "fixed",
          zIndex: "101",
          top: "2%",
        }}
      >
        {profile ? (
          <div
            className="profile-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={profile.picture}
              style={{ width: "40%", marginTop: "10%", borderRadius: "50%" }}
              alt=""
            />
            <h1
              className="name"
              style={{ marginTop: "1vh", marginBottom: "3vh" }}
            >
              {profile.name}
            </h1>
            <p>{profile.email}</p>
            <div
              className="icons"
              style={{
                alignContent: "center",
                width: "20%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <img
                style={{
                  color: "white",
                  backgroundColor: "white",
                  width: "60%",
                }}
                src="public/pencil-svgrepo-com.svg"
                alt=""
              />

              <img
                style={{
                  color: "white",
                  backgroundColor: "white",
                  width: "60%",
                }}
                src="public/calendar-day-svgrepo-com.svg"
                alt=""
              />
            </div>
            <div
              className="view-info"
              style={{
                fontFamily: "'quicksand', sans-serif",
                width: "90%",
                marginLeft: "1.5vw",
                marginTop: "0vw",
              }}
            >
              <div className="info-rows">
                <div className="field-name" style={{ width: "20%" }}>
                  Likes
                </div>
                <div id="field-data">{likeCount}</div>
              </div>
              <div className="info-rows">
                <div className="field-name" style={{ width: "30%" }}>
                  Posters
                </div>
                <div id="field-data">{createdCount}</div>
              </div>
              <div className="info-rows">
                <div className="field-name" style={{ width: "35%" }}>
                  Interests
                </div>
                <div id="field-data">{/* num of saved events */}</div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div
        className="posters"
        style={{
          width: "65%",
          marginTop: "2%",
        }}
      >
        <Tabs variant="soft-rounded" onChange={handleTabChange}>
          <TabList
            style={{
              color: "white",
              position: "fixed",
              zIndex: "100",
              backgroundColor: "rgba(249, 238, 255, .85)",
              width: "75%",
              padding: "1%",
              top: "10%",
              left: "30%",
            }}
          >
            <Tab
              backgroundColor={"transparent !important"}
              style={{
                color: "rgba(63, 49, 94, 1)",
                marginRight: "2%",
              }}
              _selected={{
                backgroundColor: "rgba(63, 49, 94, 1) !important",
                color: "white !important",
              }}
            >
              Saved
            </Tab>
            <Tab
              backgroundColor={"transparent !important"}
              style={{
                color: "rgba(63, 49, 94, 1)",
              }}
              _selected={{
                backgroundColor: "rgba(63, 49, 94, 1) !important",
                color: "white !important",
              }}
            >
              Created
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div
                className="saved-grid"
                style={{ marginTop: "5%", left: "50%" }}
              >
                {savedPosters.map((poster, index) => (
                  <Box key={index}>
                    <ImageCard
                      title={poster.title!}
                      content={poster.content!}
                      startDate={poster.startDate!}
                      endDate={poster.endDate!}
                      location={poster.location}
                      link={poster.link}
                      description={poster.description}
                      tags={poster.tags}
                      recurs={poster.isRecurring!}
                      id={poster.id}
                    />
                  </Box>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div
                className="created-grid"
                style={{ marginTop: "5%", left: "50%" }}
              >
                {createdPosters.map((poster, index) => (
                  <Box key={index}>
                    <ImageCard
                      title={poster.title!}
                      content={poster.content!}
                      startDate={poster.startDate!}
                      endDate={poster.endDate!}
                      location={poster.location}
                      link={poster.link}
                      description={poster.description}
                      tags={poster.tags}
                      recurs={poster.isRecurring!}
                      id={poster.id}
                    />
                  </Box>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </main>
  );
}
