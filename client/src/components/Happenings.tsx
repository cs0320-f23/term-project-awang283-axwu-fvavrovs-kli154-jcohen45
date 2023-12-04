// import React from "react";
import { Box } from "@chakra-ui/react";
import "../styles/Happenings.css";
import { images } from "./Home";

export const ImageCard = (
  title: string,
  path: string,
  date: string,
  time: string,
  location: string
) => {
  const [weekday, month, day] = date.split(" ");
  return (
    <div className="image-card">
      <div className="card-backing">
        <img src={path} alt={title}></img>
      </div>
      <div className="image-overlay">
        <div className="top-info">
          <div className="month-date">
            <p id="month">{month}</p>
            <p id="day">{day}</p>
          </div>
          <div className="weekday-time">
            <p id="weekday">{weekday}</p>
            <p id="time">{time}</p>
          </div>
        </div>
        <div className="title-location">
          <p id="title">{title}</p>
          <p id="location">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default function Happenings() {
  return (
    <main className="happenings">
      <h1>Happenings</h1>
      <Box
        className="grid"
        padding={4}
        sx={{ columnCount: [1, 2, 3], columnGap: "3vw" }}
      >
        {images.map((item) =>
          ImageCard(item.title, item.path, item.date, item.time, item.location)
        )}
      </Box>
    </main>
  );
}
