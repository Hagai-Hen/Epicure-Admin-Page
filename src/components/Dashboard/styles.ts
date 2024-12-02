import styled from "styled-components";
import { colors } from "../../constants/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FONT_SIZE } from "../../constants/sizes";

export const DashboardContainer = styled.div`
  display: flex;
  width: 80vw;
  max-height: 100vh;
  background-color: ${colors.backgroundColor};
  align-items: center;
  flex-direction: column;
`;

export const DashboardHeaderContainer = styled.div`
  margin-top: 20px;
  width: 90%;
`;

export const DashboardBackIcon = styled(ArrowBackIcon)`
  max-height: 20px;
  max-width: 20px;
  padding-right: 5px;
`;

export const DashboardHeaderBack = styled.h5`
  font-weight: 300;
  margin: 0;
`;

export const DashboardBackContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  &:hover {
    cursor: pointer;
  }
  color: ${colors.borderButtonColor};
`;

export const DashboardHeaderTitle = styled.h1`
  margin: 0;
  font-size: ${FONT_SIZE.GNT};
`;

export const DashboardHeaderEntries = styled.h4`
  margin: 0;
  margin-bottom: 20px;
  font-size: ${FONT_SIZE.SML};
  font-weight: 500;
  color: ${colors.entriesColor};

`;
