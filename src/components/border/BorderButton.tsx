import styled from "styled-components";
import { baseButtonColor } from "../../pallet";

const BorderButton = styled.button`
  font-size: 20px;
  padding: 15px 100px;
  border-radius: 20px;
  border: none;
  color: white;
  background-color: ${baseButtonColor};
  margin-bottom: 20px;
`;

export default BorderButton;
