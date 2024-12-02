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
import { useEffect, useState } from "react";
import { SIDE_BAR } from "../../resources/content";
import { useNavigate } from "react-router-dom";

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
    const currentPage = location.pathname.split('/').pop() || '';
    setActivePage(currentPage.toLowerCase());
  }, [location.pathname, setActivePage]);

  const handleClick = (item: string) => {
    navigate(item);
    setActivePage(item);
  };
  return (
    <>
      <SideBarContainer>
        <SideBarHeader>
          <HeaderText>{SIDE_BAR.HEADER_TITLE}</HeaderText>
          <CustomSearchIcon sx={{ fontSize: 20 }} />
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
            isActive={item.toLocaleLowerCase() === activePage}
            onClick={() => handleClick(item)}
          >
            <SmallCircleIcon
              isActive={item.toLocaleLowerCase() === activePage}
              sx={{ fontSize: 6 }}
            />
            <SideBarCollection
              isActive={item.toLocaleLowerCase() === activePage}
            >
              {item}
            </SideBarCollection>
          </SideBarItem>
        ))}
      </SideBarContainer>
    </>
  );
};

export default SideBar;
