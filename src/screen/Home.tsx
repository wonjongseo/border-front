import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 35px auto;
  max-width: 600px;
`;

const Text = styled.span`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 30px;
  &:nth-child(2) {
    font-size: 20px;
    font-weight: 700;
  }
`;
const Summary = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  height: 40vh;
  padding: 10px 0px;
  span:first-child {
    font-size: 13px;
    opacity: 0.7;
    margin-right: 15px;
  }
`;
const Name = styled.div`
  margin-top: 60px;
  font-size: 25px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const HOME_PATH = "/";
interface IState {
  state: {
    username?: string;
  };
}
function Home() {
  const { state } = useLocation() as IState;
  return (
    <Container>
      <Header>
        <Text>KISSCOのインターン活動</Text>
        <Text>プロジェクト二番：掲示板を作る</Text>
      </Header>

      {state?.username ? (
        <Name>おはようございます {state?.username} 様 😀</Name>
      ) : null}
      <Summary>
        <span>created by: </span>
        <Name> 元鍾瑞(ウォンジョンソ）</Name>
      </Summary>
    </Container>
  );
}

export default Home;
