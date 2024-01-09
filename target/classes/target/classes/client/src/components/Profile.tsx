import "../styles/Profile.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";

export default function Profile() {
  const [profile] = useRecoilState(profileState);

  return (
    <main>
      <div
        className="profile-content"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1 className="profile-header">Welcome, {profile.name}</h1>
        <div className="profile-picture">
          {" "}
          <img
            src={profile.picture}
            alt="the user's profile picture"
            style={{ marginLeft: "5%" }}
          />
        </div>
      </div>
    </main>
  );
}
