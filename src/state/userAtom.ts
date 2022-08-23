import { atom } from "recoil";

const username = sessionStorage.getItem("username");

export const usernameAtom = atom<string | null>({
  key: "username",
  default: username != null ? username : null,
});
