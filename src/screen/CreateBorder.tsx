import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postBorder } from "../api";
import { baseButtonColor } from "../pallet";
import { usernameAtom } from "../state/userAtom";
import { LOGIN_PATH } from "./Login";

const Form = styled.form`
  margin-top: 20px 0px;
  display: grid;
  row-gap: 5px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 15px 100px;
  border-radius: 20px;
  border: none;
  color: white;
  background-color: ${baseButtonColor};
`;

const Select = styled.select``;

const TextArea = styled.textarea`
  height: 50vh;
  font-size: 16px;
  resize: none;
`;
export interface IBorder {
  category: string;
  title: string;
  content: string;
}

function CreatePost() {
  const { register, handleSubmit } = useForm<IBorder>();
  const username = useRecoilValue(usernameAtom);
  const nav = useNavigate();

  useEffect(() => {
    if (username === null) {
      nav(LOGIN_PATH, {
        state: { error: "掲示板を作るにはまずログインしてください。" },
      });
    }
  }, []);

  const onValid = async (data: IBorder) => {
    console.log(data.content);

    const reponse = await postBorder(data);

    nav(-1);
    console.log(reponse);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Select {...register("category")} defaultValue="category">
        <option value="category" disabled>
          게시판을 선택해주세요
        </option>
        <option value={"일본어 수업"}>일본어 수업</option>
        <option value={"IT 수업"}>IT 수업</option>
      </Select>
      <input {...register("title")} placeholder="title" />
      <TextArea
        {...register("content")}
        placeholder="content"
        wrap="hard"
        rows={2}
        cols={20}
      ></TextArea>
      <Button>提出</Button>
    </Form>
  );
}

export default CreatePost;
