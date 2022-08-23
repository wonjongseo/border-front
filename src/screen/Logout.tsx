import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usernameAtom } from "../state/userAtom";
import { HOME_PATH } from "./Home";

export const LOGOUT_PATH = "/logout";

function Logout() {
  const nav = useNavigate();

  const setUsername = useSetRecoilState(usernameAtom);
  useEffect(() => {
    sessionStorage.removeItem("username");
    setUsername(null);
    nav(HOME_PATH);
  }, []);

  return <div></div>;
}

export default Logout;
