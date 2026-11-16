import { Route, Routes } from "react-router";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";

export default function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
