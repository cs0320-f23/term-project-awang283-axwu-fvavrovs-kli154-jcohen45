import { atom } from "recoil";
import { IPoster } from "../Happenings";
import { IPosterObject } from "../CreateImageModal";

export const searchState = atom<string>({
  key: "searchState",
  default: "",
});

export const searchResultsState = atom<IPoster[]>({
  key: "searchResultState",
  default: [],
});

export const tagsState = atom<Set<string>>({
  key: "tagsState",
  default: new Set(),
});

export const profileState = atom<any>({
  key: "profileState",
  default: null,
});

//keeps track of a poster's currently filled in fields in case a user decides to draft / hits x without meaning to delete it
export const posterState = atom<IPosterObject>({
  key: "posterState",
  default: {},
});

export const posterSrcState = atom<string>({
  key: "posterSrcState",
  default: "",
});

export const modalOpenState = atom<string>({
  key: "modalOpenState",
  default: "",
});

export const refreshState = atom<boolean>({
  key: "refreshState",
  default: false,
});
