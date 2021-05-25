import React, { createContext } from "react";
import { TOKEN_POST, USER_GET } from "../Components/api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // React.useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   if (token) {
  //     getUser(token);
  //   }
  // }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setAuthenticated(true);
    console.log(json);
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({
      username,
      password,
    });
    const response = await fetch(url, options);
    const json = await response.json();
    window.localStorage.setItem("token", json.token);
    getUser(json.token);
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
