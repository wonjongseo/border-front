import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { JOIN_PATH } from "../screen/Join";
import { LOGIN_PATH } from "../screen/Login";
import { LOGOUT_PATH } from "../screen/Logout";
import { usernameAtom } from "../state/userAtom";

const HeaderContainer = styled.header`
  height: 10vh;
  width: 600px;
  margin: 30px auto 0 auto;
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

  return (
    <HeaderContainer>
      <Items>
        <Item>
          <Link to={"/"}>Home</Link>
        </Item>
        {username !== null ? (
          <Item>
            <Link to={LOGOUT_PATH}>Logout</Link>
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
