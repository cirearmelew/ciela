    import { useEffect } from "react";
import "../../styles/contactRedirect.css";

export default function Discord1() {
  const url = "https://discord.gg/yukiisito";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mini-redirect">
      <img src="../../../public/images/icons/discord.png" className="mini-icon" />
      <p className="mini-text">Redirecting to Discord…</p>
    </div>
  );
}
