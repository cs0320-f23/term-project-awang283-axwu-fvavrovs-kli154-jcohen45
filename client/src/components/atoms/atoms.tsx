import { atom } from "recoil";

export const searchState = atom<string>({
  key: "searchState",
  default: "",
});

export const tagsState = atom<Set<string>>({
  key: "tagsState",
  default: new Set(),
});
