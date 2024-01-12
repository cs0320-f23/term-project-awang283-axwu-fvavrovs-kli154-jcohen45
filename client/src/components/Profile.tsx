import "../styles/Profile.css";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function Profile() {
  const [profile] = useRecoilState(profileState);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [createdCount, setCreatedCount] = useState<number>(0);

  useEffect(() => {
    // Check if profile is not null before trying to access properties
    if (profile) {
      getUserCreated();
      getUserLikes();
    }
  }, [profile]);

  const getUserLikes = async () => {
    const likesResp = await fetch(
      "http://localhost:8080/users/savedPosters/" + profile.id
    );
    if (likesResp.ok) {
      const likes = await likesResp.json();
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
    }
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
          marginLeft: "5%",
          marginTop: "2%",
          borderRadius: "30px",
          boxShadow: "0px 3px 10px 4px rgba(63, 49, 94, 0.15)",
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

      <div className="posters" style={{ width: "60%", marginTop: "2%" }}>
        <Tabs variant="soft-rounded">
          <TabList style={{ color: "white" }}>
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
              <p>Display Saved Posters</p>
            </TabPanel>
            <TabPanel>
              <p>Disp created Posters</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </main>
  );
}
