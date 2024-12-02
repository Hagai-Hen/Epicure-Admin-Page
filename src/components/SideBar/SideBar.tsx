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

interface SideBarProps {
  collections: string[];
}

export const SideBar = ({ collections }: SideBarProps) => {
  const [activeItem, setActiveItem] = useState<number>();

  const handleClick = (index: number) => {
    setActiveItem(index);
  };
  return (
    <>
      <SideBarContainer>
        <SideBarHeader>
          <HeaderText>Content</HeaderText>
          <CustomSearchIcon sx={{ fontSize: 20 }}/>
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
            isActive={activeItem === index}
            onClick={() => handleClick(index)}
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
