// src/App.js

import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Import Routes dan Route
import { useDispatch, useSelector } from "react-redux"; // Import hook Redux
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action"; // Import action untuk logout

// Import Halaman/Komponen yang akan dibuat (akan kita buat nanti)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddThreadPage from "./pages/AddThreadPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import Navigation from "./components/Navigation"; // Komponen navigasi (akan kita buat)
import Loading from "./components/Loading"; // Komponen loading bar (akan kita buat)

function App() {
  const {
    authUser = null,
    isPreload = false,
    loadingBar = 0, // Dapatkan state loadingBar dari Redux
  } = useSelector((states) => states); // Dapatkan semua state dari Redux store

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Jalankan proses preload saat aplikasi pertama kali dimuat
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    // Logika untuk sign out
    dispatch(asyncUnsetAuthUser());
    // Redirect ke halaman login atau home setelah logout (opsional, bisa di handle di komponen login/home)
  };

  if (isPreload) {
    // Tampilkan sesuatu saat preload, misalnya splash screen atau loading indicator minimal
    return null; // Atau komponen splash screen / loading
  }

  const mainContent =
    authUser === null ? (
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    ) : (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/new" element={<AddThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    );
  return (
    <>
      <Loading show={loadingBar > 0} />
      {authUser && ( // Hanya tampilkan navigasi jika sudah login
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
      )}
      <main className="page-content">
        {" "}
        {/* Tambahkan class .page-content */}
        {mainContent}
      </main>
    </>
  );
}

export default App;
