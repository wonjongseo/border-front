import axios from "axios";
import { off } from "process";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postUserInfo } from "../api";
import { BottomNav } from "../components/user/BottomNav";
import { Form } from "../components/user/Form";
import { Input } from "../components/user/Input";

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
  const { handleSubmit, register } = useForm<IJoinInfo>();
  const nav = useNavigate();

  const onValid = async (event: IJoinInfo) => {
    try {
      const response = await postUserInfo(event);

      console.log(response.statues);

      nav("/login");
    } catch (error) {
      nav("/");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          // value={"visionwill@naver.com"}
          {...register("email")}
          placeholder="email"
        />
        <Input
          // value={"wonjongseo"}
          {...register("name")}
          placeholder="name"
        />
        <Input
          // value={"a1234"}
          {...register("password")}
          placeholder="password"
          type={"password"}
        />
        <Input
          //   value={"a1234"}
          {...register("password2")}
          placeholder="password"
          type={"password"}
        />
        <button>Join</button>
      </Form>
      <BottomNav>
        <Link to="/login">이미 회원가입 하셨습니까 ? &rarr;</Link>
      </BottomNav>
    </Container>
  );
}
export default Join;
