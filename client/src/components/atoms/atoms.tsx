import { atom } from "recoil";
import { IPoster } from "../Happenings";

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

export const loadState = atom<boolean>({
  key: "loadState",
  default: true,
});

export const profileState = atom<any>({
  key: "profileState",
  default: null,
});
