import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
// import { Button } from "@chakra-ui/react";

function App() {
  const [loggedIn] = useState<boolean>(false);
  return (
    <>
      <article>
        <header>
          <nav>
            <div className="left-links">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/happenings" element={<Happenings />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/about" element={<About />} /> */}
              </Routes>
              <Link to="/">P@B</Link>
              <Link to="/happenings">Happenings</Link>
              <Link to="/archive">Archive</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="right-links">
              {loggedIn ? (
                <>
                  <button>+</button>
                  <button>User Profile</button>
                </>
              ) : (
                <>
                  {" "}
                  <button>Log in</button>
                  <button>Sign Up</button>
                </>
              )}
            </div>
          </nav>
        </header>
        <Home />
      </article>
    </>
  );
}

export default App;
