import {
  SideBarCollection,
  SideBarContainer,
  SideBarTitle,
  SideBarItem,
  SmallCircleIcon,
  SideBarCollectionCount,
  SideBarTitleContainer,
  SideBarHeader,
  CustomSearchIcon,
  HeaderText,
  Divider,
} from "./styles";
import { useCallback, useEffect } from "react";
import { SIDE_BAR } from "../../resources/content";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface SideBarProps {
  collections: string[];
  activePage: string;
  setActivePage: (page: string) => void;
}

export const SideBar = ({
  collections,
  activePage,
  setActivePage,
}: SideBarProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = location.pathname.split(`${ROUTES.COLLECTIONS}/`).pop() || "";
    setActivePage(currentPage.toLowerCase());
  }, [location.pathname, setActivePage]);

  const handleClick = useCallback((item: string) => {
    navigate(`${ROUTES.COLLECTIONS}/${item}`);
    setActivePage(item);
  }, [navigate, setActivePage]);
  return (
    <>
      <SideBarContainer>
        <SideBarHeader>
          <HeaderText>{SIDE_BAR.HEADER_TITLE}</HeaderText>
          <CustomSearchIcon />
        </SideBarHeader>
        <Divider />
        <SideBarTitleContainer>
          <SideBarTitle>{SIDE_BAR.COLLECTIONS_TITLE}</SideBarTitle>
          <SideBarCollectionCount>
            {SIDE_BAR.COLLECTIONS_LENGTH}
          </SideBarCollectionCount>
        </SideBarTitleContainer>
        {collections.map((item: string, index) => (
          <SideBarItem
            key={index}
            isActive={item === activePage}
            onClick={() => handleClick(item)}
          >
            <SmallCircleIcon
              isActive={item === activePage}
            />
            <SideBarCollection isActive={item === activePage}>
              {item}
            </SideBarCollection>
          </SideBarItem>
        ))}
      </SideBarContainer>
    </>
  );
};

export default SideBar;
