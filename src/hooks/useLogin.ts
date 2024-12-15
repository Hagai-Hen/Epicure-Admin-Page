import { useState } from "react";
import forge from "node-forge";
import { useAuthContext } from "../context/useAuthContext";
import { PUBLIC_KEY } from "../resources/keys";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const encryptPassword = (password: string) => {
    const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);
    const encrypted = publicKey.encrypt(password, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  };

  const login = async (email: string, password: string) => {
    const isValid = handleInputErrors({ email, password });
    if (!isValid) throw new Error("Fields are required");

    setLoading(true);

    try {
      const encryptedPassword = encryptPassword(password);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: encryptedPassword }),
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
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

function handleInputErrors({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return email && password;
}

export default useLogin;