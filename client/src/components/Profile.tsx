import "../styles/Profile.css";
import { useRecoilState } from "recoil";
import { profileState, refreshState } from "./atoms/atoms";
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
  Button,
} from "@chakra-ui/react";
import Masonry from "masonry-layout";
import { IPoster } from "./Happenings";
import imagesLoaded from "imagesloaded";
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
import { ProfileImageCard } from "./ProfileImageCard";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const [profile, setProfile] = useRecoilState(profileState);
  const [localProfile, setLocalProfile] = useState<any>({});
  const [likeCount, setLikeCount] = useState<number>(0);
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [createdPosters, setCreatedPosters] = useState<IPoster[]>([]);
  const [savedPosters, setSavedPosters] = useState<IPoster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [calOpen, setCalOpen] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [interestsState, setInterestsState] = useState<boolean>(false);
  const [refresh] = useRecoilState(refreshState);

  useEffect(() => {
    // Check if profile is not null before trying to access properties
    setIsLoading(true);
    if (profile) {
      const get = async () => {
        await getUserCreated();
        await getUserLikes();
        await getUserInterests();
      };
      get().then(() => setIsLoading(false));
    }
  }, [profile, refresh]);

  useEffect(() => {
    imagesLoaded(`.saved-grid`, function () {
      new Masonry(`.saved-grid`, {
        columnWidth: 34,
        itemSelector: ".profile-card",
        gutter: 11,
      });
    });
    imagesLoaded(`.created-grid`, function () {
      new Masonry(`.created-grid`, {
        columnWidth: 34,
        itemSelector: ".profile-card",
        gutter: 11,
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
        itemSelector: ".profile-card",
        gutter: 11,
      });
    });
    imagesLoaded(`.created-grid`, function () {
      new Masonry(`.created-grid`, {
        columnWidth: 34,
        itemSelector: ".profile-card",
        gutter: 11,
      });
    });
  };

  //takes in a file and returns an imgur link
  const createImgurLink = async (file: File | string) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const url = "http://localhost:8080/posters/uploadToImgur";

      const formData = new FormData();
      console.log(file);
      formData.append("content", file);
      const res = await axios.post(url, formData, config);

      return Promise.resolve(res.data.data);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        console.log(error);
        return Promise.resolve(
          `Error in fetch: ${error.response.data.message}`
        );
      } else {
        return Promise.resolve("Error in fetch: Network error or other issue");
      }
    }
  };

  const handleProfilePictureUpload = async (
    target: EventTarget & HTMLInputElement
  ) => {
    if (target.files) {
      const file = target.files[0]; //getting the file object
      const output = await createImgurLink(file);
      setProfile({ ...profile, picture: output });
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
        },
        withCredentials: true,
      };
      const url = "http://localhost:8080/users/update/" + profile.id;

      const res = await axios.put(url, updatedUser, config);

      // Set the user profile in state
      setProfile(updatedUser);
      setLocalProfile({});
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
    <main className="user-page">
      {isLoading && (
        <div className="loading-screen">
          <img className="loading-gif" src="/loading.gif" />
        </div>
      )}
      {calOpen && <CalendarModal onClose={() => setCalOpen(false)} />}
      <div className="profile">
        {editingMode ? (
          <>
            {/* <EditProfileModal onClose={() => setEditingMode(false)} /> */}
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
              {/* add x that calls setProfile(localProfile) and sets editing mode to false */}
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
                  Liked
                </div>
                <div id="field-data">{likeCount}</div>
              </div>
              <div className="info-rows">
                <div className="field-name" style={{ width: "30%" }}>
                  Created
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
                {Array.from(profile.interests).map((interest, indx) => (
                  <div className={classNameTag(indx)} key={indx}>
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          profile && (
            <>
              <img className="profile-picture" src={profile.picture} alt="" />
              <h1 className="name" style={{ marginTop: "1vh" }}>
                {profile.name}
              </h1>
              <p>{profile.email}</p>
              <div className="icons">
                <Button
                  className="edit-button"
                  onClick={() => {
                    setEditingMode(true);
                    setLocalProfile(profile);
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  className="calendar-button"
                  onClick={() => setCalOpen(true)}
                >
                  <img
                    className="calendar-icon"
                    src="/calendar-day-svgrepo-com.svg"
                    alt=""
                  />
                </Button>
              </div>
              <div className="info-rows">
                <div className="field-name">Liked</div>
                <div id="field-data">{likeCount}</div>
              </div>
              <div className="info-rows">
                <div className="field-name">Created</div>
                <div id="field-data">{createdCount}</div>
              </div>
              <div className="info-rows">
                <div className="field-name">Interests</div>
              </div>
              <div id="profile-interests">
                {Array.from(interests).map((interest, index) => (
                  <div className={classNameTag(index)} key={index}>
                    {interest}
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
      {interestsState && (
        <InterestsModal
          createUser={createUser}
          page={false}
          onClose={() => setInterestsState(false)}
        />
      )}
      <Tabs
        variant="soft-rounded"
        className="profile-posters"
        onChange={handleTabChange}
      >
        <TabList className="tabs-list">
          <Tab
            backgroundColor={"transparent !important"}
            className="profile-tabs"
            style={{
              marginRight: "1.5%",
            }}
            _selected={{
              backgroundColor: "rgba(63, 49, 94, 1) !important",
              color: "white !important",
              boxShadow: "0px 1px 9px 0px rgba(63, 49, 94, 0.20)",
            }}
          >
            Liked
          </Tab>
          <Tab
            backgroundColor={"transparent !important"}
            className="profile-tabs"
            _selected={{
              backgroundColor: "rgba(63, 49, 94, 1) !important",
              color: "white !important",
              boxShadow: "0px 1px 9px 0px rgba(63, 49, 94, 0.20)",
            }}
          >
            Created
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="saved-grid">
              {savedPosters.map((poster, index) => (
                <Box key={index}>
                  <ProfileImageCard
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
                    isCreated={false}
                  />
                </Box>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="created-grid">
              {createdPosters.map((poster, index) => (
                <Box key={index}>
                  <ProfileImageCard
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
                    isCreated={true}
                  />
                </Box>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
