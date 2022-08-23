import styled from "styled-components";

const Container = styled.div`
  height: 100vh;

  margin: 35px auto;
  max-width: 600px;
`;

const Text = styled.span`
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 60px;
  &:nth-child(2) {
    font-size: 20px;
    font-weight: 700;
  }
`;
const Summarys = styled.ul``;
const Summary = styled.li`
  padding: 10px 0px;
  span:first-child {
    font-size: 13px;
    opacity: 0.7;
  }
`;
const Name = styled.span`
  font-size: 20px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const HOME_PATH = "/";
function Home() {
  return (
    <Container>
      <Header>
        <Text>KISSCOのインターン活動</Text>
        <Text>プロジェクト二番：掲示板を作る</Text>
      </Header>
      <Summarys>
        <Summary>
          <span>created by: </span>
          <Name> 元鍾瑞　(ウォンジョンソ）</Name>
        </Summary>
        <Summary>
          1.会員は掲示板を作り、編集、削除、見ることができます。
        </Summary>
        <Summary>
          2.会員は掲示板を作り、編集、削除、見ることができます。
        </Summary>
        <Summary>
          3.会員は掲示板を作り、編集、削除、見ることができます。
        </Summary>
        <Summary>
          4.会員は掲示板を作り、編集、削除、見ることができます。
        </Summary>
      </Summarys>
    </Container>
  );
}

export default Home;
