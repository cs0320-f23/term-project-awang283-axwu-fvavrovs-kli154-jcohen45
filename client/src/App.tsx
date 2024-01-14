import { useCallback, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Happenings from "./components/Happenings";
import Archive from "./components/Archive";
import About from "./components/About";
import "./styles/App.css";
import { Button } from "@chakra-ui/react";
import CreateImageModal from "./components/CreateImageModal";
import {
  CredentialResponse,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { createUser } from "./functions/fetch";
import Profile from "./components/Profile";
import { modalOpenState, profileState } from "./components/atoms/atoms";
import { useRecoilState } from "recoil";
import InterestsModal from "./components/InterestsModal";

export default function App() {
  const [modalOpen, setModalOpen] = useRecoilState<string>(modalOpenState);
  const [user, setUser] = useState<CredentialResponse>();
  const [profile, setProfile] = useRecoilState(profileState);
  const [interestsState, setInterestsState] = useState<boolean>(false);
  // const [poster] = useRecoilState<IPoster>(posterState);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      // Set the user profile in state
      setProfile(JSON.parse(userProfile));
      console.log(profile);
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          if (res.data.hd == "brown.edu" || res.data.hd == "risd.edu") {
            setProfile(res.data);
            localStorage.setItem("userProfile", JSON.stringify(res.data));
          } else {
            window.alert("Please use a valid Brown or RISD email");
            setProfile(null);
          }
        })
        .catch((err) => console.log(err));
      //check if user exists in database w get user by id
      const findUser = async () => {
        if (profile) {
          try {
            const userID = profile.id;
            const foundUser = await fetch(
              "http://localhost:8080/users/" + userID
            );
            if (foundUser.ok) {
              const userValid = await foundUser.json();

              if (userValid.message === "User found") {
                setProfile(profile);
                setInterestsState(false);
              } else {
                setInterestsState(true);
                //return <InterestsModal createUser={createUser} />;
              }
            }
          } catch (e) {
            console.log("error fetching user" + e);
          }
        }
      };
      findUser().then((p) => {
        return p;
      });
    }
  }, [user, profile]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem("userProfile");
    navigate("/home");
  };

  const handleCreatePoster = useCallback(() => {
    // Toggle the state to open/close the modal
    setModalOpen("createImage");
  }, []);

  return (
    <>
      <article>
        <header>
          <nav>
            <div className="left-links">
              <NavLink to="/home" id="logo">
                P@B
              </NavLink>
              <NavLink to="/happenings" className="nav-link">
                Happenings
              </NavLink>
              <NavLink to="/archive" className="nav-link">
                Archive
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </div>
            <div className="right-links">
              {profile ? (
                <>
                  <Button id="create" onClick={handleCreatePoster}>
                    +
                  </Button>
                  <div id="profile">
                    <NavLink to="/profile" className="profile-link">
                      {profile.name}
                    </NavLink>
                  </div>
                  <Button id="logout" onClick={logOut} color={"white"}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <div className="g-signin2" data-onsuccess="onSignIn">
                    <Button id="login" onClick={() => login()}>
                      Login
                    </Button>
                  </div>
                </>
              )}
            </div>
          </nav>
        </header>
        <main style={{ height: "fit-content" }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/happenings" element={<Happenings />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          {modalOpen && <CreateImageModal />}
        </main>
        <footer
          className="nav-link"
          style={{
            width: "90%",
            position: "relative",
            zIndex: "500",
            marginTop: "5vh",
            marginLeft: "2vw",
            marginRight: "20vw",
            height: "8vh",
            fontFamily: "'quicksand', sans-serif",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(202, 226, 255, .85)",
          }}
        >
          <div className="left">email / feedback</div>
          <div className="right">Made with love</div>
        </footer>
      </article>
      {interestsState && <InterestsModal createUser={createUser} />}
    </>
  );
}
