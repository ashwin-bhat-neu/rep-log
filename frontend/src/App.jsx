import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
