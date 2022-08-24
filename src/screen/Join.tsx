import axios from "axios";
import { off } from "process";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postUserInfo } from "../api";
import { BottomNav } from "../components/user/BottomNav";
import { Form } from "../components/user/Form";
import { Input } from "../components/user/Input";
import { LOGIN_PATH } from "./Login";

const Container = styled.div`
  display: flex;
  height: 80vh;
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

interface IState {
  state: {
    erorr?: string;
  };
}
export const JOIN_PATH = "/join";
function Join() {
  const { handleSubmit, register, getValues, setError, formState } =
    useForm<IJoinInfo>();
  const { state } = useLocation() as IState;
  const nav = useNavigate();

  const onValid = async (data: IJoinInfo) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        { message: "비밀번호가 동일하지 않습니다" },
        { shouldFocus: true }
      );
      return;
    }
    const { email, password } = getValues();

    try {
      nav(LOGIN_PATH, {
        state: {
          email,
          password,
        },
      });
    } catch (error) {
      setError(
        "email",
        {
          message: "이메일이 중복되었습니다",
        },
        { shouldFocus: true }
      );
    }
  };
  return (
    <Container>
      {state?.erorr ? <div>{state?.erorr}</div> : null}
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("email")} placeholder="email" />
        <span>{formState.errors?.email?.message}</span>
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
        <span>{formState.errors?.password2?.message}</span>
        <button>Join</button>
      </Form>
      <BottomNav>
        <Link to={LOGIN_PATH}>もう会員でございますか&rarr;</Link>
      </BottomNav>
    </Container>
  );
}
export default Join;
