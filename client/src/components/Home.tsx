// import React from "react";
import { Select } from "@chakra-ui/react";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="posters">
      <label className="label">
        <div className="text-wrapper">Posters @ Brown</div>
      </label>
      <div className="home-content">
        <div className="searchbar">
          <input className="input" placeholder="Search" type="text" />
          <Select placeholder="tags" w={"2vw"}>
            {/* TODO: fetch list of tags and map each of them to an option, when clicked, set list of selected tags to contain tag, when clicked again, unselect tag */}
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
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
