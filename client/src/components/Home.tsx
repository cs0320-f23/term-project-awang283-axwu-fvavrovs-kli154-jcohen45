import React from "react";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="posters">
      <label className="label">
        <div className="text-wrapper">Posters @ Brown</div>
      </label>
      <div className="home-content">
        <input className="input" placeholder="Search" type="text" />
        {/* map each poster to an img w/in a div  */}
        <div>Right now nothing is in here.</div>
      </div>
    </main>
  );
}
