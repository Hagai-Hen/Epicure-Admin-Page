import styled from "styled-components";
import { colors } from "../../constants/colors";
import CircleIcon from "@mui/icons-material/Circle";
import SearchIcon from "@mui/icons-material/Search";
import { FONT_SIZE } from "../../constants/sizes";

interface SideBarItemProps {
  isActive: boolean;
}

export const SideBarContainer = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: ${colors.backgroundColor};
  border-right: 1px solid ${colors.borderColor};
`;

export const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  max-width: 100%;
`;

export const HeaderText = styled.h3`
  color: ${colors.textColor};
`;

export const CustomSearchIcon = styled(SearchIcon)`
  background-color: ${colors.searchBackground};
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${colors.buttonBackgroundColor};
  max-height: 20px;
  max-width: 20px;
`;

export const Divider = styled.div`
  border-bottom: 1px solid #ddd;
  margin-left: 20px;
  width: 20%;
`;

export const SideBarTitle = styled.h5`
  color: ${colors.textColor};
`;

export const SideBarCollectionCount = styled.div`
  display: flex;
  background-color: ${colors.buttonBackgroundColor};
  border-radius: 5px;
  padding: 0 5px;
  font-size: ${FONT_SIZE.SML};
  align-items: center;
  justify-content: center;
`;

export const SideBarTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const SideBarCollection = styled("h4")<SideBarItemProps>`
  color: ${(props) =>
    props.isActive ? `${colors.borderButtonColor}` : `${colors.textColor}`};
  padding: 0;
  margin: 0;
  font-weight: 200;
`;

export const SideBarItem = styled("div")<SideBarItemProps>`
  display: flex;
  padding-left: 25px;
  padding: 5px 20px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-right 0.3s ease;
  background-color: ${(props) =>
    props.isActive ? `${colors.buttonClicked}` : "transparent"};
  border-right: ${(props) =>
    props.isActive ? `2px solid ${colors.borderButtonColor}` : "none"};

  &:hover {
    background-color: ${colors.hoverButtonColor};
  }
`;

export const SmallCircleIcon = styled(CircleIcon)<SideBarItemProps>`
  color: ${(props) =>
    props.isActive ? `${colors.borderButtonColor}` : `${colors.textColor}`};
  margin-right: 10px;
  max-height: 6px;
  max-width: 6px;
`;
