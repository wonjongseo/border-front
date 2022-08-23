import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { JOIN_PATH } from "../screen/Join";
import { LOGIN_PATH } from "../screen/Login";
import { usernameAtom } from "../state/userAtom";

const HeaderContainer = styled.header`
  height: 10vh;
  padding: 20px;
`;

const Items = styled.ul`
  display: flex;
  justify-content: end;
`;

const Item = styled.li`
  padding-left: 20px;
`;

function Header() {
  const username = useRecoilValue(usernameAtom);
  console.log(username);

  return (
    <HeaderContainer>
      <Items>
        <Item>
          <Link to={"/"}>Home</Link>
        </Item>
        {username !== null ? (
          <Item>
            <Link to={LOGIN_PATH}>Logout</Link>
          </Item>
        ) : (
          <>
            <Item>
              <Link to={LOGIN_PATH}>Login</Link>
            </Item>

            <Item>
              <Link to={JOIN_PATH}>join</Link>
            </Item>
          </>
        )}

        <Item>
          <Link to={"/border"}>Border</Link>
        </Item>
      </Items>
    </HeaderContainer>
  );
}

export default Header;

/**
 * function Header() {
  return (
    <HeaderContainer>
      <Items>
        <Item>
          <Link to="/">Home</Link>
        </Item>
        <Item>
          <Link to="/login">Login</Link>
        </Item>
        <Item>
          <Link to="/border">Border</Link>
        </Item>
      </Items>
    </HeaderContainer>
  );
}
 */