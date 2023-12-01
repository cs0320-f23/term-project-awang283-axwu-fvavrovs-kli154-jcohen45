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
        <div className="tags">
          <span className="text">Suggested tags:</span>{" "}
          <div className="tag-holder">
            <div className="magenta-tag">free food</div>
            <div className="green-tag">Party</div>
          </div>
        </div>
        <div className="happenings-label">Happenings Today</div>
        {/* map each poster to an img w/in a div  */}
      </div>
    </main>
  );
}
