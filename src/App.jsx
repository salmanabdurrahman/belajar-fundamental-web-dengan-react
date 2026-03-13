import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator";
import Navigation from "./components/Navigation";
import { useLocale } from "./contexts/LocaleContext";
import AddNotePage from "./pages/AddNotePage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute, PublicRoute } from "./routes/AccessRoutes";
import {
  getAccessToken,
  getUserLogged,
  putAccessToken,
  removeAccessToken,
} from "./utils/network-data";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [initializingAuth, setInitializingAuth] = useState(true);
  const { t } = useLocale();

  useEffect(() => {
    let isMounted = true;

    async function bootstrapAuth() {
      if (!getAccessToken()) {
        if (isMounted) {
          setInitializingAuth(false);
        }
        return;
      }

      const response = await getUserLogged();

      if (!isMounted) {
        return;
      }

      if (response.error) {
        removeAccessToken();
        setAuthUser(null);
      } else {
        setAuthUser(response.data);
      }

      setInitializingAuth(false);
    }

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = async (accessToken) => {
    putAccessToken(accessToken);

    const response = await getUserLogged();

    if (response.error) {
      removeAccessToken();
      throw new Error("Failed to fetch authenticated user");
    }

    setAuthUser(response.data);
  };

  const handleLogout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  if (initializingAuth) {
    return <LoadingIndicator message={t("loadingApp")} fullPage />;
  }

  return (
    <div className="app">
      <Navigation authUser={authUser} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute authUser={authUser}>
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute authUser={authUser}>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute authUser={authUser}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/archives"
            element={
              <ProtectedRoute authUser={authUser}>
                <ArchivePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/new"
            element={
              <ProtectedRoute authUser={authUser}>
                <AddNotePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <ProtectedRoute authUser={authUser}>
                <DetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage homePath={authUser ? "/" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
