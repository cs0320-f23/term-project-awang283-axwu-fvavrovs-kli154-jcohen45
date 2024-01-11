import "../styles/Profile.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";

export default function Profile() {
  const [profile] = useRecoilState(profileState);

  return (
    <main
      className="user-page"
      style={{ top: "6.5%", display: "flex", justifyContent: "space-between" }}
    >
      <div
        className="profile"
        style={{
          backgroundColor: "white",
          width: "25%",
          height: "85vh",
          marginLeft: "5%",
          marginTop: "2%",
          borderRadius: "30px",
          boxShadow: "0px 3px 10px 4px rgba(63, 49, 94, 0.15)",
        }}
      >
        <div
          className="profile-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={profile.picture}
            style={{ width: "40%", marginTop: "10%", borderRadius: "50%" }}
            alt=""
          />
          <h1 className="name" style={{ marginTop: "1vh" }}>
            {profile.name}
          </h1>
        </div>
      </div>
      <div className="posters"></div>
    </main>
  );
}
