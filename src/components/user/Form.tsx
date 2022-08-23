import styled from "styled-components";

import { baseButtonColor } from "../../pallet";
export const Form = styled.form`
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 310px;
  width: 460px;
  display: flex;
  padding: 70px 30px;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;

  button {
    margin-top: 60px;
    padding: 15px 100px;
    border: none;
    color: white;
    background-color: ${baseButtonColor};
  }
`;
