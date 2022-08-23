import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postBorder } from "../api";
import BorderButton from "../components/border/BorderButton";
import BorderForm from "../components/border/BorderForm";
import BorderTextArea from "../components/border/BorderTextArea";
import { baseButtonColor } from "../pallet";
import { usernameAtom } from "../state/userAtom";
import { LOGIN_PATH } from "./Login";

const Select = styled.select``;

export interface ICreateBorder {
  category: string;
  title: string;
  content: string;
}
export const CREATE_BORDER_PATH = "border/create";
function CreateBorder() {
  const { register, handleSubmit } = useForm<ICreateBorder>();
  const username = useRecoilValue(usernameAtom);
  const nav = useNavigate();

  useEffect(() => {
    if (username === null) {
      nav(LOGIN_PATH, {
        state: { error: "掲示板を作るにはまずログインしてください。" },
      });
    }
  }, []);

  const onValid = async (data: ICreateBorder) => {
    console.log(data.content);

    const reponse = await postBorder(data);

    nav(-1);
    console.log(reponse);
  };

  return (
    <BorderForm onSubmit={handleSubmit(onValid)}>
      <Select {...register("category")} defaultValue="日本語授業">
        <option value="category" disabled>
          カテゴリーを選んでください。
        </option>
        <option value={"日本語授業"}>日本語授業</option>
        <option value={"IT授業"}>IT授業</option>
      </Select>
      <input {...register("title")} placeholder="title" />
      <BorderTextArea
        {...register("content")}
        placeholder="content"
        wrap="hard"
        rows={2}
        cols={20}
      ></BorderTextArea>
      <BorderButton>提出</BorderButton>
    </BorderForm>
  );
}

export default CreateBorder;
