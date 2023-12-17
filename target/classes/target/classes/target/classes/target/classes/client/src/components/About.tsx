// import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <>
      <main>
        <div
          className="about-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1> About Us</h1>
          <div
            className="photo-container"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              className="imgcaption"
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <div
                className="imgs"
                style={{
                  display: "flex",
                  width: "40%",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="/pabnorm.png"
                  alt="Photo of 5 people sitting on a couch"
                  style={{
                    width: "100%",
                    marginRight: "5%",
                    boxShadow: "0px 3px 10px 3px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <img
                  src="/pab.jpg"
                  alt="Photo of 4 people on a couch and one person on their lap"
                  style={{
                    width: "100%",
                    boxShadow: "0px 3px 10px 3px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </div>

              <p>
                From left to right: Jackie Cohen, Fanny-Marie Vavrosky, Anna
                Wang, Katie Li, Aj Wu
              </p>
            </div>
            <div className="body-text" style={{ width: "50%" }}>
              <p style={{ marginBottom: "5%" }}>
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
        </div>
      </main>
    </>
  );
}
