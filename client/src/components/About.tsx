import "../styles/About.css";

export default function About() {
  return (
    <>
      <main style={{ height: "fit-content" }}>
        <div
          className="about-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="first-section">
            <div className="header-div">
              <h1 id="header">About Us</h1>
            </div>
            <div className="body-text">
              <p>
                Posters at Brown started out as a silly little idea to create an
                archive of tons of physical posters of student events, organize
                them, and then donate them to the Hay, solely because we thought
                it might be interesting to see how student ideas, values, and
                aesthetics shift over time.
              </p>
              <p>
                Now, Posters at Brown functions as a hub for all student hosted
                events at Brown, from club meetings to dances and more. It aims
                to use the medium of posters to turn physical advertisement into
                an easy way for students to find all the events they've ever
                wanted to go to, but would've missed out on otherwise.
              </p>
            </div>
          </div>
          <div className="second-section">
            <div className="photo-container-one">
              <div className="img-backing">
                <img
                  className="norm-img"
                  src="/pabnorm.png"
                  alt="Photo of 5 people sitting on a couch"
                  id="about-image"
                />
              </div>
              <div
                className="img-backing"
                style={{ padding: "0.9vw", borderRadius: "15px" }}
              >
                <img
                  className="zoom-img"
                  src="/silly.png"
                  alt="Photo of 5 people on a Zoom call"
                  id="about-image"
                />
              </div>
            </div>
            <div className="photo-container-two">
              <p id="caption">
                &lt; From left to right: Jackie Cohen, Fanny-Marie Vavrovsky,
                Anna Wang, Katie Li, AJ Wu
              </p>
              <div className="img-backing">
                <img
                  className="pab-img"
                  src="/pab_alt.png"
                  alt="Photo of 4 people on a couch and one person on their lap"
                  id="about-image"
                />
              </div>
            </div>
          </div>
          <div className="third-section">
            <div className="meet-team">
              <h1 id="meet">Meet the Team</h1>
            </div>
            <div className="bios">
              <div className="name-card">
                <div className="card-overlay">Biblical Figure: Jesus</div>
                <div className="card-back">
                  <svg
                    className="icon-tabler"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4a3 3 0 0 1 3 3v9" />
                    <path d="M7 7a3 3 0 0 1 6 0v11a3 3 0 0 1 -3 3" />
                    <path d="M16 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  </svg>
                  Jackie Cohen
                </div>
              </div>
              <div className="name-card">
                <div className="card-overlay">
                  Biblical Figure: King Solomon
                </div>
                <div className="card-back">
                  <svg
                    className="icon-tabler"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 20l14 0" />
                    <path d="M5 17h5v-.3a7 7 0 1 1 4 0v.3h5" />
                  </svg>
                  Katie Li
                </div>
              </div>
              <div className="name-card">
                <div className="card-overlay">Biblical Figure: God</div>
                <div className="card-back">
                  <svg
                    className="icon-tabler"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 3a6 6 0 0 0 12 0" />
                    <path d="M12 15m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                  </svg>
                  Anna Wang
                </div>
              </div>
              <div className="name-card">
                <div className="card-overlay">Biblical Figure: Zacchaeus</div>
                <div className="card-back">
                  <svg
                    className="icon-tabler"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 3a6 6 0 0 0 12 0" />
                    <path d="M12 15m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                  </svg>
                  AJ Wu
                </div>
              </div>
              <div className="name-card">
                <div className="card-overlay">Biblical Figure: Joseph</div>
                <div className="card-back">
                  <svg
                    className="icon-tabler"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 3a21 21 0 0 1 0 18" />
                    <path d="M19 3a21 21 0 0 0 0 18" />
                    <path d="M5 12l14 0" />
                  </svg>
                  Fanny-Marie Vavrovsky
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
