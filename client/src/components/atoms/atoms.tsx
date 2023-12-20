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
