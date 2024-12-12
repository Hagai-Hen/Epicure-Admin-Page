import styled from "styled-components";
import { colors } from "../../constants/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FONT_SIZE } from "../../constants/sizes";
import { Paper } from "@mui/material";

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
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 10px;
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

export const DashboardLeftHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DashboardRightHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const DashboardCreateButton = styled.button`
  background-color: ${colors.borderButtonColor};
  margin: 0;
  margin-top: 30px;
  padding: 5px 15px;
  height: 35%;
  color: ${colors.white};
  font-size: ${FONT_SIZE.SML};
  border-radius: 5px;
`;

export const CustomPaper = styled(Paper)`
  height: 50%;
  width: 90%;
`;

export const TableImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const DialogImg = styled.img`
  max-width: 100px;
  margin-top: 8px;
`;

export const UploadButton = styled.label`
  background-color: ${colors.borderButtonColor};
  margin: 0;
  margin-top: 30px;
  padding: 5px 15px;
  height: 35%;
  color: ${colors.white};
  font-size: ${FONT_SIZE.SML};
  border-radius: 5px;
  cursor: pointer;
`;

export const UploadInput = styled.input`
  display: none;
`;