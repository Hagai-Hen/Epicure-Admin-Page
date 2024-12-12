import { useState } from "react";
import forge from "node-forge";
import { useAuthContext } from "../context/useAuthContext";
import { PUBLIC_KEY } from "../resources/keys";  // Public key is imported here

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const encryptPassword = (password: string) => {
    const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);  // Load the public key
    const encrypted = publicKey.encrypt(password, 'RSA-OAEP');  // Encrypt password using RSA-OAEP padding
    return forge.util.encode64(encrypted);  // Return the encrypted password as base64 string
  };

  const login = async (email: string, password: string) => {
    const isValid = handleInputErrors({ email, password });
    if (!isValid) throw new Error("Fields are required");

    setLoading(true);

    try {
      const encryptedPassword = encryptPassword(password);
      console.log("encrypted", encryptedPassword);

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
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

// Input validation function
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