import { useCallback, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
              <Link to="/home" id="logo">
                P@B
              </Link>
              <Link to="/happenings">Happenings</Link>
              <Link to="/archive">Archive</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="right-links">
              {loggedIn ? (
                <>
                  <Button onClick={handleCreatePoster}>+</Button>
                  <Button>User Profile</Button>
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
            <Route path="/happenings" element={<Happenings />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
          </Routes>
          {createImageModal && <CreateImageModal />}
        </main>
      </article>
    </>
  );
}
