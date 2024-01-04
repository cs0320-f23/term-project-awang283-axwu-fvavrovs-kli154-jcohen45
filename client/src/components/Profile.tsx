import "../styles/Profile.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";

export default function Profile() {
  const [profile, setProfile] = useRecoilState<any>(profileState);

  return (
    <main>
      <div className="profile-content">
        <h1 className="profile-header">Welcome, {profile.name}</h1>
      </div>
    </main>
  );
}
