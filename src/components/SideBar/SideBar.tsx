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
import { useState } from "react";
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
  const [activeItem, setActiveItem] = useState<number>();
  const navigate = useNavigate();

  const handleClick = (index: number, item: string) => {
    setActiveItem(index);
    navigate(item);
    setActivePage(item)
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
            isActive={
              activeItem === index || item.toLocaleLowerCase() === activePage
            }
            onClick={() => handleClick(index, item)}
          >
            <SmallCircleIcon
              isActive={activeItem === index}
              sx={{ fontSize: 6 }}
            />
            <SideBarCollection isActive={activeItem === index}>
              {item}
            </SideBarCollection>
          </SideBarItem>
        ))}
      </SideBarContainer>
    </>
  );
};

export default SideBar;
