import { useLocation } from "react-router-dom";
import { IBorder } from "./BordersPage";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../state/userAtom";
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
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 40px;
  letter-spacing: 8px;
`;

const Content = styled.div`
  background-color: 100;
`;
const BorderDetail = () => {
  const username = useRecoilValue(usernameAtom);

  const {
    state: { border },
  } = useLocation() as IBorderState;

  return (
    <Container>
      <MetaData id="meta">
        <Username>{border.name}</Username>
        <CreateAt>{border.createdAt}</CreateAt>
      </MetaData>
      <Title id="title">{border.title.replaceAll("\n", "<br/>")}</Title>
      <div id="category"> {border.category} </div>
      <div id="content"> {border.content}</div>
      {username === border.email ? <div>IsMy</div> : null}
    </Container>
  );
};

export default BorderDetail;
