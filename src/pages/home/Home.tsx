import { useAuthContext } from "../../context/useAuthContext";
import { HomeMainContainer, WelcomeTypo } from "./styles";
import { HOME_PAGE } from "../../resources/content";

function HomePage() {

  const { authUser } = useAuthContext();

  return (
    <HomeMainContainer>
        {authUser && <WelcomeTypo>{HOME_PAGE.WELCOME} {authUser.name}</WelcomeTypo>}
    </HomeMainContainer>
  );
}

export default HomePage;
