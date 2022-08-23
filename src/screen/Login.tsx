import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postUserLogin } from "../api";
import { BottomNav } from "../components/user/BottomNav";
import { Form } from "../components/user/Form";
import { Input } from "../components/user/Input";
import { usernameAtom } from "../state/userAtom";
import { HOME_PATH } from "./Home";
import { JOIN_PATH } from "./Join";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export interface ILoginInfo {
  email: string;
  password: string;
}
export const LOGIN_PATH = "/login";

interface LocationState {
  state: {
    error?: string;
    email?: string;
    password?: string;
  };
}

function Login() {
  const nav = useNavigate();
  const location = useLocation() as LocationState;
  console.log(location);

  const { register, handleSubmit } = useForm<ILoginInfo>();

  const [username, setUsername] = useRecoilState(usernameAtom);

  const onValid = async (data: ILoginInfo) => {
    const response = await postUserLogin(data);
    setUsername(response.data);
    nav(HOME_PATH);
  };

  return (
    <Container>
      {location.state?.error == null ? null : (
        <span>{location.state?.error}</span>
      )}
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          value={location.state?.email}
          {...register("email")}
          placeholder="email"
          type={"text"}
        />
        <Input
          {...register("password")}
          placeholder="password"
          type={"password"}
        />
        <button>Login</button>
      </Form>
      <BottomNav>
        <Link to={JOIN_PATH}>会員加入をしに行きますか &rarr;</Link>
      </BottomNav>
    </Container>
  );
}

export default Login;
