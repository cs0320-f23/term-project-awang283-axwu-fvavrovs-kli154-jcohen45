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
          <p>Insert some text about why we made this</p>
          <p>
            Insert some text about each of us 5 and maybe a lil pic or drawing?
          </p>
        </div>
      </main>
    </>
  );
}
