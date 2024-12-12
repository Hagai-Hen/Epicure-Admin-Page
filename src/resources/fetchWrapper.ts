import { ROUTES } from "../constants/routes";
import { LOGIN_PAGE } from "./content";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = sessionStorage.getItem("token");

  // Attach the token if available
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      console.log("401 Unauthorized error detected");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("authUser");

      window.location.href = ROUTES.LOGIN;
      alert("User is not authorized or session expired.")
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetch request:", error);
    throw error;
  }
};
