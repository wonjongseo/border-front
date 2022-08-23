import React, { useEffect, useState } from "react";
import { deleteBorder, getAllBorders } from "../api";
import styled from "styled-components";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../state/userAtom";
import { useForm } from "react-hook-form";
import { BORDER_PATH } from "./BorderPage";
import { Router } from "express";
import CreatePost, { CREATE_BORDER_PATH, ICreateBorder } from "./CreateBorder";
import { baseButtonColor } from "../pallet";
import BorderForm from "../components/border/BorderForm";
import BorderButton from "../components/border/BorderButton";
import BorderTextArea from "../components/border/BorderTextArea";

interface IBorderProps {
  path: string;
}

const Tmp = styled.div`
  display: flex;
  align-items: end;
  /* background-color: red; */
  flex-direction: column;
`;
export interface IBorder {
  id: number;
  title: string;
  content: string;
  category: string;
  email: string;
  name: string;
  createdAt: string;
}

const Border = styled.div`
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const Username = styled.div`
  font-size: 13px;
  opacity: 0.5;
`;
const CreateAt = styled.span`
  font-size: 11px;
`;

const MetaData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

// hiden

const Select = styled.select``;

const HidenForm = styled.div<{ isClick?: boolean }>`
  display: ${(p) => (p.isClick === true ? "block" : "none")};
`;

const BordersPage = ({ path }: IBorderProps) => {
  const [borders, setBorders] = useState<IBorder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = useRecoilValue(usernameAtom);
  const [tmp, setTmp] = useState(-1);
  const { register, handleSubmit } = useForm<ICreateBorder>();

  const nav = useNavigate();

  const loadBorders = async () => {
    setBorders(await getAllBorders(path));
    setIsLoading(false);
  };
  useEffect(() => {
    console.log(borders);
    loadBorders();
  }, [path]);

  const onClick = async (
    event: React.FormEvent<HTMLButtonElement>,
    id: number,
    index?: number
  ) => {
    const {
      currentTarget: { value },
    } = event;

    switch (value) {
      case "delete":
        await deleteBorder(id);
        nav(BORDER_PATH);
        break;

      case "update":
        setTmp(index!);
        break;
      default:
        return;
    }
  };

  const onUpdadeSubmit = (data: ICreateBorder) => {
    console.log(data);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("asdasd");
  };

  return (
    <div>
      {isLoading ? (
        <span>Loaindg...</span>
      ) : (
        borders.map((border, index) => {
          console.log(border.category);

          return (
            <div key={border.id}>
              <Border>
                <Link to={`/border-detail/${border.id}`} state={{ border }}>
                  {index + 1}: {border.title}
                </Link>
                <MetaData>
                  <CreateAt>{border.createdAt}</CreateAt>
                  <Tmp>
                    <Username>작성자: {border.name}</Username>
                    {username === border.email ? (
                      <form onSubmit={onSubmit}>
                        <button
                          value="update"
                          onClick={(event) => onClick(event, border.id, index)}
                        >
                          Update
                        </button>
                        <button
                          value="delete"
                          onClick={(event) => onClick(event, border.id)}
                        >
                          Delete
                        </button>
                      </form>
                    ) : null}
                  </Tmp>
                </MetaData>
              </Border>
              {username === border.email ? (
                <HidenForm isClick={index === tmp}>
                  <BorderForm onSubmit={handleSubmit(onUpdadeSubmit)}>
                    <Select
                      {...register("category", { value: border.category })}
                      defaultValue={border.category}
                    >
                      <option value="category" disabled>
                        カテゴリーを選んでください。
                      </option>
                      <option value={"日本語授業"}>IT授業</option>
                      <option value={"IT授業"}>IT授業</option>
                    </Select>
                    <input
                      {...register("title", {
                        value: border.title,
                      })}
                      placeholder="title"
                    />
                    <BorderTextArea
                      {...register("content", {
                        value: border.content,
                      })}
                      placeholder="content"
                      wrap="hard"
                      rows={2}
                      cols={20}
                    ></BorderTextArea>
                    <BorderButton>提出</BorderButton>
                  </BorderForm>
                </HidenForm>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default BordersPage;
