import { useState } from "react";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import { LoginButton, LoginMainContainer, LoginSheet } from "./styles";
import { LOGIN_PAGE } from "../../resources/content";
import useLogin from "../../hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const { login } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <LoginMainContainer>
      <LoginSheet>
        <div>
          <Typography level="h4" component="h1">
            <b>{LOGIN_PAGE.WELCOME}</b>
          </Typography>
          <Typography level="body-sm">{LOGIN_PAGE.SIGN_IN}</Typography>
        </div>

        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>{LOGIN_PAGE.EMAIL}</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder={LOGIN_PAGE.EMAIL_PLACEHOLDER}
              value={email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{LOGIN_PAGE.PASSWORD}</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder={LOGIN_PAGE.PASSWORD_PLACEHOLDER}
              value={password}
              onChange={handleInputChange}
            />
          </FormControl>
          <LoginButton type="submit">{LOGIN_PAGE.LOGIN_BUTTON}</LoginButton>
        </form>
      </LoginSheet>
    </LoginMainContainer>
  );
}
