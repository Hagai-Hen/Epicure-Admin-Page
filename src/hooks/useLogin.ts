import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  // Function to handle user login
  const login = async (email: string, password: string) => {
    console.log("Email:", email);
    console.log("pass", password);
    const isValid = handleInputErrors({ email, password });
    if (!isValid) throw new Error("those fields are required");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      sessionStorage.setItem("token", JSON.stringify(data.token));
      sessionStorage.setItem("authUser", JSON.stringify(data.authUser));

      setAuthUser(data.authUser);
    } catch (error) {
      console.log("Error in login", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return false;
  }
  return true;
}
