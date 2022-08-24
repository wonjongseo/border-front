import { useLocation, useNavigate } from "react-router-dom";
import { IBorder } from "./BordersPage";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../state/userAtom";
import { sleep } from "react-query/types/core/utils";
import { deleteBorder } from "../api";
import { useState } from "react";
export const BORDER_DETAIL_PATH = "/border-detail/:id";

interface IBorderState {
  state: {
    border: IBorder;
  };
}

const Container = styled.div`
  margin: 35px auto;
  max-width: 600px;
`;

const MetaData = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  height: 40px;

  justify-content: space-between;
  margin-bottom: 40px;
`;
const CreateAt = styled.div`
  opacity: 0.5;
  font-size: 10px;
`;
const Username = styled.div`
  margin-top: 200px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: 600;
  letter-spacing: 6px;
`;

const Category = styled.div`
  font-size: 14px;
  margin: 10px 0;
`;

const Content = styled.div`
  margin-top: 50px;
  font-size: 20px;
`;
const BorderDetail = () => {
  const {
    state: { border },
  } = useLocation() as IBorderState;

  return (
    <Container>
      <Title>{border.title.replaceAll("\n", "<br/>")}</Title>
      <Category> {border.category} </Category>
      <Content> {border.content}</Content>
      <MetaData>
        <Username>{border.name}</Username>
        <CreateAt>{border.createdAt}</CreateAt>
      </MetaData>
    </Container>
  );
};

export default BorderDetail;
