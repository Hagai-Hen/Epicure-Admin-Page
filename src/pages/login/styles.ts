import styled from "styled-components";
import { colors } from "../../constants/colors";

export const LoginMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoginSheet = styled.div`
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
`;

export const LoginButton = styled("Button")`
margin-top: 5px;
background-color: ${colors.borderButtonColor};
color: white;
`;
