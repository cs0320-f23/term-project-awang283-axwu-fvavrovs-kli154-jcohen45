//for functions where we use the same backend call multiple times

import axios from "axios";
import { IPoster } from "../components/CreateImageModal";

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  posters?: string[];
  picture?: string;
  interests?: Set<string>;
  createdPosters?: IPoster[];
  savedPosters?: IPoster[];
}

export async function fetchTags() {
  try {
    const response = await fetch("http://localhost:8080/posters/alltags");
    if (response.ok) {
      const tagsData = await response.json();
      return tagsData;
    } else {
      throw new Error("Failed to fetch tags");
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
} //notes : liking posts, making it an app, giving users recs by interests

export async function createUser(profile) {
  try {
    const user: IUser = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      interests: profile.interests,
    };

    // console.log("inside createUser", user);
    //add to database
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
      withCredentials: true,
    };

    //if home page:
    const url = "http://localhost:8080/users/create";

    const res = await axios.post(url, user, config);
    // console.log("inside creatUser res", res);
    return Promise.resolve(res.data.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.resolve(`Error in fetch: ${error.response.data.message}`);
    } else {
      return Promise.resolve("Error in fetch: Network error or other issue");
    }
  }
}

export const fetchSaved = async (userId, id, className) => {
  try {
    //fetch savedposters
    const savedPosters = await fetch(
      "http://localhost:8080/users/savedPosters/" + userId.id
    );
    //if poster in saved , set class to clicked
    if (savedPosters.ok) {
      const posterSet = await savedPosters.json();
      //compare id passed in to each poster in set

      posterSet.data.forEach((poster) => {
        console.log(poster.id === id);
        if (poster.id === id) {
          console.log("hello");
          document.querySelector(className)!.classList.add("clicked");
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const classNameTag = (index: number) => {
  if (index % 3 == 0) {
    return "magenta-tag";
  } else if (index % 3 == 1) {
    return "green-tag";
  } else {
    return "blue-tag";
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
