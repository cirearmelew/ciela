import { useEffect } from "react";
import "../../styles/contactRedirect.css";

export default function Telegram() {
  const url = "https://t.me/swllette";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mini-redirect">
      <img src="../../../public/images/icons/telegram.png" className="mini-icon" />
      <p className="mini-text">Redirecting to Telegram…</p>
    </div>
  );
}
