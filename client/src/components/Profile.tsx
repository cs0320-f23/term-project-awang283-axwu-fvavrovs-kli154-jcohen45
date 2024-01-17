import "../styles/Profile.css";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";
import "../styles/Modal.css";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  IconButton,
  Input,
} from "@chakra-ui/react";
import Masonry from "masonry-layout";
import { IPoster } from "./CreateImageModal";
import imagesLoaded from "imagesloaded";
import { ImageCard } from "./Happenings";
import { TriangleUpIcon } from "@chakra-ui/icons";
import {
  IUser,
  classNameTag,
  createUser,
  scrollToTop,
} from "../functions/fetch";
import CalendarModal from "./CalendarModal";
import InterestsModal from "./InterestsModal";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useRecoilState(profileState);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [createdPosters, setCreatedPosters] = useState<IPoster[]>([]);
  const [savedPosters, setSavedPosters] = useState<IPoster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [calOpen, setCalOpen] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [interestsState, setInterestsState] = useState<boolean>(false);

  useEffect(() => {
    // setIsLoading(true);
    // //get profile from databse??
    // const getUser = async () => {
    //   const userresp = await fetch("http://localhost:8080/users/" + profile.id);
    //   if (userresp.ok) {
    //     const user = await userresp.json();
    //     const storedProfile = localStorage.getItem("userProfile");
    //     if (storedProfile == user.data.id) {
    //       setProfile(user.data);
    //     } else {
    //       localStorage.setItem("userProfile", user.data);
    //     }
    //   }
    // };
    // getUser();
  }, []);

  useEffect(() => {
    // Check if profile is not null before trying to access properties
    setIsLoading(true);
    //setProfile(JSON.parse(localStorage.getItem("userProfile")!));
    // console.log(profile);
    if (profile) {
      getUserCreated();
      getUserLikes();
      getUserInterests();
      // console.log(profile);
    }
    setIsLoading(false);
  }, [profile]);

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
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
      const newCreatedPosters = [];
      for (const poster of created.data) {
        const postersResp = await fetch(
          "http://localhost:8080/posters/" + poster.id
        );
        if (postersResp.ok) {
          const posterData = await postersResp.json();
          // console.log("poster data");
          // console.log(posterData.data);
          newCreatedPosters.push(posterData.data);
        }
      }
      setCreatedPosters(newCreatedPosters);
    }
  };

  const getUserInterests = async () => {
    //find user by id
    const userResp = await fetch("http://localhost:8080/users/" + profile.id);
    if (userResp.ok) {
      const user = await userResp.json();
      setInterests(user.data.interests);
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

  const handleProfilePictureUpload = async (
    target: EventTarget & HTMLInputElement
  ) => {
    //console.log("called poster upload");
    if (target.files) {
      const file = target.files[0]; //getting the file object

      if (file && file.type.startsWith("image/")) {
        //convert our image file into a format that can be fed into img component's src property to be displayed after upload
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target && typeof e.target.result === "string") {
            setProfile({ ...profile, picture: e.target.result });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const updateValue = (property, value) => {
    if (value && typeof value === "string") {
      setProfile({ ...profile, [property]: value });
    } else if (value instanceof Set) {
      setProfile({ [property]: Array.from(value) });
    }
  };

  async function updateProfile(): Promise<void> {
    //update profile in database put req
    try {
      const updatedUser: IUser = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        interests: profile.interests,
        createdPosters: createdPosters,
        savedPosters: savedPosters,
      };

      // console.log("inside createUser", updatedUser);
      //add to database
      const config = {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
        withCredentials: true,
      };
      const url = "http://localhost:8080/users/update/" + profile.id;

      const res = await axios.put(url, updatedUser, config);
      // console.log("inside creatUser res", res);

      // Set the user profile in state
      setProfile(updatedUser);
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));

      setEditingMode(false);
      return Promise.resolve(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          Promise.resolve(`Error in fetch: ${error.response.data.message}`)
        );
      } else {
        console.error(
          Promise.resolve("Error in fetch: Network error or other issue")
        );
      }
    }
  }

  return (
    <main
      className="user-page"
      style={{
        top: "6.5%",
        display: "flex",
        justifyContent: "space-between",
        height: "fit-content",
      }}
    >
      {isLoading && (
        <div className="loading-screen">
          <img className="loading-gif" src="/loading.gif" />
        </div>
      )}

      {calOpen && <CalendarModal onClose={() => setCalOpen(false)} />}

      <div
        className="profile"
        style={{
          backgroundColor: "white",
          width: "25%",
          height: "85vh",
          margin: "2%",
          borderRadius: "30px",
          boxShadow: "0px 3px 10px 4px rgba(63, 49, 94, 0.15)",
          position: "sticky",
          zIndex: "2",
          top: "10%",
          bottom: "1000vh",
        }}
      >
        {editingMode ? (
          <>
            <div
              className="profile-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                className="pfp-pic"
                style={{
                  width: "40%",
                  marginTop: "10%",
                }}
              >
                <label
                  htmlFor="profile-upload"
                  className="upload-pfp"
                  style={{
                    width: "40%",
                    position: "absolute",
                    height: "24.5%",
                    backgroundColor: "gray",
                    opacity: ".85",
                    justifyContent: "space-around",
                    display: "inline-flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <p>Upload</p>
                </label>
                <Input
                  type="file"
                  onChange={(ev) => handleProfilePictureUpload(ev.target)}
                  id="profile-upload"
                  accept="image/png, image/jpeg, image/jpg"
                  display="none"
                  style={{
                    width: "100%",
                    position: "absolute",
                    borderRadius: "50% !important",
                  }}
                ></Input>
                <img
                  src={profile.picture}
                  alt=""
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              </div>

              <Input
                placeholder={profile.name}
                value={profile.name}
                onChange={(ev) => updateValue("name", ev.target.value)}
                style={{ margin: "5%" }}
              ></Input>

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
                  onClick={updateProfile}
                  src="/check.svg"
                  alt=""
                />

                <img
                  style={{
                    color: "white",
                    backgroundColor: "white",
                    width: "60%",
                  }}
                  onClick={() => setCalOpen(true)}
                  src="/calendar-day-svgrepo-com.svg"
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
                  <div
                    id="field-data"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <img
                      style={{ width: "15%" }}
                      src="/pencil-svgrepo-com.svg"
                      onClick={() => setInterestsState(true)}
                    />
                  </div>
                </div>
                <div id="field-data">
                  {Array.from(interests).map((interest, indx) => (
                    <div className={classNameTag(indx)} key={indx}>
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          profile && (
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
                  onClick={() => setEditingMode(true)}
                  src="/pencil-svgrepo-com.svg"
                  alt=""
                />

                <img
                  style={{
                    color: "white",
                    backgroundColor: "white",
                    width: "60%",
                  }}
                  onClick={() => setCalOpen(true)}
                  src="/calendar-day-svgrepo-com.svg"
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
                </div>
                <div id="field-data">
                  {Array.from(interests).map((interest, indx) => (
                    <div className={classNameTag(indx)} key={indx}>
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div
        className="posters"
        style={{
          width: "65%",
          marginTop: "2%",
        }}
      >
        {interestsState && (
          <InterestsModal
            createUser={createUser}
            page={false}
            onClose={() => setInterestsState(false)}
          />
        )}
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
              left: "28%",
            }}
          >
            <Tab
              backgroundColor={"transparent !important"}
              style={{
                color: "rgba(63, 49, 94, 1)",
                marginRight: "1%",
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
                style={{ marginTop: "10%", left: "-5%" }}
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
                style={{ marginTop: "10%", left: "-5%" }}
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
      <IconButton
        className="scroll-top"
        color="white"
        backgroundColor="var(--dark-purple100)"
        icon={<TriangleUpIcon id="triangle-icon-up" />}
        aria-label={"scrolls user to bottom of page"}
        onClick={scrollToTop}
      />
    </main>
  );
}
