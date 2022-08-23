import { atom } from "recoil";

export const usernameAtom = atom<string | null>({
  key: "username",
  default: null,
});
