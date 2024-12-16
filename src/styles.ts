import { colors } from "../src/constants/colors"
import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  background-color: ${colors.backgroundColor};
  width: 100vw;
  height: 100vh;
`;

export const MainContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
`;