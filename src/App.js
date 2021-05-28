import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound";
import Photo from "./Components/Photo/Photo";
import User from "./Components/User/User";
import UserProfile from "./Components/User/UserProfile";
import { UserStorage } from "./contexts/UserContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProtectedRoute path="conta/*" element={<User />} />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
