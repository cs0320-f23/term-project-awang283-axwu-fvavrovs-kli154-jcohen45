import { useCallback, useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Happenings from "./components/Happenings";
import Archive from "./components/Archive";
import About from "./components/About";
import "./styles/App.css";
import { Button } from "@chakra-ui/react";
import CreateImageModal from "./components/CreateImageModal";

export default function App() {
  const [loggedIn] = useState<boolean>(true);
  const [createImageModal, setCreateImageModalOpen] = useState(false);

  const handleCreatePoster = useCallback(() => {
    // Toggle the state to open/close the modal
    setCreateImageModalOpen((prev) => !prev);
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
              <NavLink to="/happenings">Happenings</NavLink>
              <NavLink to="/archive">Archive</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
            <div className="right-links">
              {loggedIn ? (
                <>
                  <Button id="create" onClick={handleCreatePoster}>
                    +
                  </Button>
                  <Button id="profile">User Profile</Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button> Login </Button>
                  <Button>Sign up</Button>
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
          {createImageModal && (
            <CreateImageModal onClose={() => setCreateImageModalOpen(false)} />
          )}
        </main>
      </article>
    </>
  );
}
