import { Route, Routes } from "react-router";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar.jsx";
import RequireAuthentication from "./components/RequireAuthentication/RequireAuthentication.jsx";
import CustomTemplateEditorPage from "./pages/CustomTemplateEditorPage/CustomTemplateEditorPage.jsx";
import CustomTemplatesPage from "./pages/CustomTemplatesPage/CustomTemplatesPage.jsx";
import ExerciseDetailPage from "./pages/ExerciseDetailPage/ExerciseDetailPage.jsx";
import ExerciseLibraryPage from "./pages/ExerciseLibraryPage/ExerciseLibraryPage.jsx";
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
        <Route path="/exercises" element={<ExerciseLibraryPage />} />
        <Route path="/exercises/:exerciseId" element={<ExerciseDetailPage />} />
        <Route
          path="/templates"
          element={
            <RequireAuthentication>
              <CustomTemplatesPage />
            </RequireAuthentication>
          }
        />
        <Route
          path="/templates/new"
          element={
            <RequireAuthentication>
              <CustomTemplateEditorPage key="new" />
            </RequireAuthentication>
          }
        />
        <Route
          path="/templates/:templateId/edit"
          element={
            <RequireAuthentication>
              <CustomTemplateEditorPage key="edit" />
            </RequireAuthentication>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

App.propTypes = {};
