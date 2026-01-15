import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Discord from "./pages/Discord";

// Redirect Pages
import Telegram from "./pages/contact/Telegram";
import YukiiStore from "./pages/contact/YukiiStore";
import YuiService from "./pages/contact/YuiService";
import YukiiTOS from "./pages/yukii/Tos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/discord" element={<Discord />} />

        {/* Redirect Contact Pages */}
        <Route path="/telegram" element={<Telegram />} />
        <Route path="/yukiiStore" element={<YukiiStore />} />
        <Route path="/yuiService" element={<YuiService />} />

        {/* Redirect Yukii Pages */}
        <Route path="/tos" element={<YukiiTOS />} />

        {/* ⭐ Redirect TẤT CẢ đường dẫn sai về "/" */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
