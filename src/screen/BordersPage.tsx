import React, { useEffect, useState } from "react";
import {
  deleteBorder,
  getAllBorders,
  getBordersByKeyword,
  updateBorder,
} from "../api";
import styled from "styled-components";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../state/userAtom";
import { useForm } from "react-hook-form";
import { ICreateBorder } from "./CreateBorder";
import BorderForm from "../components/border/BorderForm";
import BorderButton from "../components/border/BorderButton";
import BorderTextArea from "../components/border/BorderTextArea";

interface IBorderProps {
  path: string;
}
interface IStateProps {
  state: {
    keyword: string;
  };
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
  const [tmp, setTmp] = useState(-1);
  const { register, handleSubmit } = useForm<ICreateBorder>();
  const username = useRecoilValue(usernameAtom);
  const location = useLocation() as IStateProps;
  const nav = useNavigate();

  useEffect(() => {
    loadBorders();
  }, [path]);

  const loadBorders = async () => {
    console.log("asd");

    if (path == "search") {
      setBorders(await getBordersByKeyword(location.state.keyword));
    } else {
      setBorders(await getAllBorders(path));
    }
    setIsLoading(false);
  };
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
        nav(0);
        break;
      case "update":
        setTmp((prev) => {
          if (prev === index!) {
            return -1;
          }
          return index!;
        });
        break;

      default:
        return;
    }
  };

  const onUpdadeSubmit = async (data: any, id: number) => {
    const newData = {} as any;
    Object.entries(data).map((d) => {
      if (d[0].includes(String(id))) {
        newData[d[0].split("-")[0]] = d[1];
      }
    });
    console.log(newData);

    await updateBorder(newData, id);
    nav(0);
  };

  return (
    <div>
      {isLoading ? (
        <span>로딩중... 혹은 검색한 게시판이 존재하지 않습니다...</span>
      ) : (
        borders.map((border, index) => {
          const titleRef = `title-${border.id}`;
          const contentRef = `content-${border.id}`;
          const cagetoryRef = `category-${border.id}`;

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
                      <div>
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
                      </div>
                    ) : null}
                  </Tmp>
                </MetaData>
              </Border>
              {username === border.email ? (
                <HidenForm isClick={index === tmp}>
                  <BorderForm
                    onSubmit={handleSubmit((data) =>
                      onUpdadeSubmit(data, border.id)
                    )}
                  >
                    <Select
                      {...register(cagetoryRef as any, {
                        value: border.category,
                      })}
                    >
                      <option value="category" disabled>
                        カテゴリーを選んでください。
                      </option>
                      <option value={"日本語授業"}>日本語授業</option>
                      <option value={"IT授業"}>IT授業</option>
                    </Select>
                    <input
                      {...register(titleRef as any, {
                        value: border.title,
                      })}
                      placeholder="title"
                    />
                    <BorderTextArea
                      {...register(contentRef as any, {
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
