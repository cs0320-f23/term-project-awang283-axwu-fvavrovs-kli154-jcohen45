import { useCallback, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
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

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  posters?: string[];
}

export default function App() {
  const [modalOpen, setModalOpen] = useState<string>("");
  const [user, setUser] = useState<CredentialResponse>();
  const [profile, setProfile] = useState<any>([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
          } else if (res.data.hd != "brown.edu" || res.data.hd != "risd.edu") {
            window.alert("Please use a valid Brown or RISD email");
          } else {
            setProfile(null);
          }
          //check if user exists in database w get user by id
          console.log(profile);
          if (profile) {
            try {
              const userID = profile.id;
              const foundUser = await fetch(
                "http://localhost:8080/users/" + userID
              );
              if (foundUser.ok) {
                const userValid = await foundUser.json();

                if (userValid.data) {
                  setProfile(profile);
                }
                //if not, call create user
                else {
                  try {
                    const user: IUser = {
                      id: profile.id,
                      name: profile.name,
                      email: profile.email,
                    };

                    console.log(profile);
                    //add to database
                    const config = {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    };
                    const url = "http://localhost:8080/users/create/";
                    // const formData = new FormData();

                    // formData.append("id", user.id!);
                    // formData.append("name", user.name!);
                    // formData.append("email", user.email!);

                    // console.log(
                    //   JSON.stringify(Array.from(formData)) + " formdata"
                    // );
                    const res = await axios.post(url, user, config);
                    console.log(res);
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
            } catch (e) {
              console.log("error fetching user" + e);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
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
                  <Button id="profile">User Profile</Button>
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
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/happenings" element={<Happenings />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
          </Routes>
          {modalOpen && <CreateImageModal onClose={() => setModalOpen("")} />}
        </main>
      </article>
    </>
  );
}
