import React, { createContext } from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "../Components/api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setAuthenticated(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUser(token) {
    console.log("oi");
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setAuthenticated(true);
    console.log(json);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: Credenciais inválidas`);
      const { token } = await response.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogin, authenticated, userLogout, loading, error, data }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
