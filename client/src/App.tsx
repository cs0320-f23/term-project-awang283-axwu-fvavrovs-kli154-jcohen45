import { useCallback, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Happenings from "./components/Happenings";
import Archive from "./components/Archive";
import About from "./components/About";
import "./styles/App.css";
import { Button } from "@chakra-ui/react";
import CreateImageModal from "./components/CreateImageModal";
import TagsModal from "./components/TagsModal";

export default function App() {
  const [loggedIn] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<string>("");

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
          {modalOpen === "createImage" && (
            <CreateImageModal
              setModalState={setModalOpen}
              onClose={() => setModalOpen("")}
            />
          )}
          {modalOpen === "addTags" && (
            <TagsModal onClose={() => setModalOpen("")} />
          )}
        </main>
      </article>
    </>
  );
}
