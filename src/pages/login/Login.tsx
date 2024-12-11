import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import { LoginButton, LoginMainContainer, LoginSheet } from "./styles";
import { LOGIN_PAGE } from "../../resources/content";

export default function LoginPage() {
  return (
    <LoginMainContainer>
      <LoginSheet>
        <div>
          <Typography level="h4" component="h1">
            <b>{LOGIN_PAGE.WELCOME}</b>
          </Typography>
          <Typography level="body-sm">{LOGIN_PAGE.SIGN_IN}</Typography>
        </div>
        <FormControl>
          <FormLabel>{LOGIN_PAGE.EMAIL}</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder={LOGIN_PAGE.EMAIL_PLACEHOLDER}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{LOGIN_PAGE.PASSWORD}</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder={LOGIN_PAGE.PASSWORD_PLACEHOLDER}
          />
        </FormControl>
        <LoginButton>{LOGIN_PAGE.LOGIN_BUTTON}</LoginButton>
      </LoginSheet>
    </LoginMainContainer>
  );
}
