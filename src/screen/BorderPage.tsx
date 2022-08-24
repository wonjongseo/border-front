import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { usernameAtom } from "../state/userAtom";
import BordersPage from "./BordersPage";
import CreateBorder, { CREATE_BORDER_PATH } from "./CreateBorder";
import { LOGIN_PATH } from "./Login";

export const BORDER_PATH = "/border";

const Categorys = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  margin: 5px auto;
  max-width: 600px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const NavItem = styled.div``;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li<{ isClick?: boolean }>`
  margin-right: 20px;
  color: ${(p) => (p.isClick ? "green" : null)};

  &:hover {
    cursor: pointer;
  }
`;

const Form = styled.form``;

const CreateButtonBox = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
`;
const CreateButton = styled(Link)`
  border-radius: 10px;
  padding: 12px;
  color: white;
  font-size: 12px;
  margin-bottom: 30px;
  background-color: #687698;
  &:hover {
    cursor: pointer;
  }
`;

const Category = styled(CreateButton)<{ isClick?: boolean }>`
  margin-right: 20px;
`;

const Input = styled.input``;

function BorderPage() {
  const { register, handleSubmit } = useForm();
  const isAllUrl = useMatch("/border/all");
  const isMyUrl = useMatch("/border/my");
  const nav = useNavigate();
  const usename = useRecoilValue(usernameAtom);

  useEffect(() => {
    if (isMyUrl != null && usename == null) {
      nav(LOGIN_PATH, { state: { error: "먼저 로그인을 해주세요" } });
    }
  }, [keyboard]);

  const onValid = (data: { keyword?: string }) => {
    console.log("new");

    const { keyword } = data;
    console.log(keyword);
    nav("search", { state: { keyword }, replace: true });
  };
  return (
    <Container>
      <Nav>
        <NavItem>
          <Items>
            <Item isClick={isAllUrl != null}>
              <Link to="all">All Posts</Link>
            </Item>
            {usename ? (
              <Item isClick={isMyUrl != null}>
                <Link to="my">My Posts</Link>
              </Item>
            ) : null}
          </Items>
        </NavItem>
        <NavItem>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("keyword")}
              placeholder="검색어를 입력하세요."
            />
            <Input as="button">전송</Input>
          </Form>
        </NavItem>
      </Nav>

      <hr />

      <CreateButtonBox>
        <Categorys>
          <Category to={"japan"}>日本語授業</Category>
          <Category to={"IT"}>IT授業</Category>
        </Categorys>
        <CreateButton to="create">Create Post</CreateButton>
      </CreateButtonBox>

      <Routes>
        <Route path="create" element={<CreateBorder />} />
        <Route path="all" element={<BordersPage path="all" />} />
        <Route path="my" element={<BordersPage path="my" />} />
        <Route path="japan" element={<BordersPage path="japan" />} />
        <Route path="it" element={<BordersPage path="it" />} />
        <Route path="search" element={<BordersPage path="search" />} />
      </Routes>
    </Container>
  );
}

export default BorderPage;
