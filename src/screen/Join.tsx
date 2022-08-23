import axios from "axios";
import { off } from "process";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postUserInfo } from "../api";
import { BottomNav } from "../components/user/BottomNav";
import { Form } from "../components/user/Form";
import { Input } from "../components/user/Input";
import { LOGIN_PATH } from "./Login";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export interface IJoinInfo {
  email: string;
  name: string;
  password: string;
  password2: string;
}
export const JOIN_PATH = "/join";
function Join() {
  const { handleSubmit, register, getValues } = useForm<IJoinInfo>();

  const nav = useNavigate();

  const onValid = async (event: IJoinInfo) => {
    const { email, password } = getValues();
    try {
      const response = await postUserInfo(event);

      console.log(response.statues);

      nav(LOGIN_PATH, {
        state: {
          email,
          password,
        },
      });
    } catch (error) {
      nav("/");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("email")} placeholder="email" />
        <Input {...register("name")} placeholder="name" />
        <Input
          {...register("password")}
          placeholder="password"
          type={"password"}
        />
        <Input
          {...register("password2")}
          placeholder="password"
          type={"password"}
        />
        <button>Join</button>
      </Form>
      <BottomNav>
        <Link to={LOGIN_PATH}>もう会員でございますか&rarr;</Link>
      </BottomNav>
    </Container>
  );
}
export default Join;
