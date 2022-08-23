import React, { useEffect, useState } from "react";
import { deleteBorder, getAllBorders } from "../api";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../state/userAtom";
import { useForm } from "react-hook-form";
import { BORDER_PATH } from "./BorderPage";

interface IBorderProps {
  path: string;
}

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
  /* font-weight: 700; */
`;
const CreateAt = styled.span`
  font-size: 11px;
`;

const MetaData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
const BordersPage = ({ path }: IBorderProps) => {
  const [borders, setBorders] = useState<IBorder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = useRecoilValue(usernameAtom);
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
    id: number
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
        break;
      default:
        return;
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      {isLoading ? (
        <span>Loaindg...</span>
      ) : (
        borders.map((border, index) => (
          <Border key={border.id}>
            <div>
              <Link to={`/border-detail/${border.id}`} state={{ border }}>
                {index + 1}: {border.title}
              </Link>
            </div>
            <MetaData>
              <CreateAt>{border.createdAt}</CreateAt>
              <Username>작성자: {border.name}</Username>
              {username === border.email ? (
                <form onSubmit={onSubmit}>
                  <button
                    value="update"
                    onClick={(event) => onClick(event, border.id)}
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
            </MetaData>
          </Border>
        ))
      )}
    </div>
  );
};

export default BordersPage;
