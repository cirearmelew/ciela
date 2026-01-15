import "../styles/contact.css";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    // Load hiệu ứng tuyết & mouse glow nếu bạn muốn reuse
    import("../scripts/snow.js");
    import("../scripts/mouseCanvas.js");

    return () => {
      document.querySelectorAll(".snowflake").forEach((el) => el.remove());
      document.querySelectorAll(".mouse-canvas").forEach((el) => el.remove());
    };
  }, []);

  const contacts = [
    {
      id: 1,
      label: "Discord",
      value: "@itsmefreyaa",
      link: "https://discord.com/users/961994878546485268",
      icon: "discord",
    },
    {
      id: 2,
      label: "Telegram",
      value: "@swllette",
      link: "https://t.me/swllette",
      icon: "telegram",
    },
    {
      id: 3,
      label: "Email",
      value: "dqrkx@itsmefreyaa.xyz",
      link: "mailto:dqrkx@itsmefreyaa.xyz",
      icon: "mail",
    },
  ];

  // Icon components
  const Icons = {
    discord: (
      <svg viewBox="0 0 127.14 96.36" width="24" height="24" fill="currentColor">
        <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.23 8.09C2.79 32.65-1.71 56.6.54 80.21a104.5 104.5 0 0 0 26.14 8.09 72.06 72.06 0 0 0 3.36-6.83 97.68 97.68 0 0 0 29.11 0A72.37 72.37 0 0 0 81.47 96.3a105.89 105.89 0 0 0 26.23-8.09c3.33-6.48 6.4-14.61 6.4-22.63 0-17.36-5.28-33.96-14.88-47.26z" />
      </svg>
    ),
    telegram: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.775a.4.4 0 0 1 .374.112.4.4 0 0 1 .062.268c-.028.136-.133.26-.284.26-.118.005-.255-.005-.395-.021z" />
      </svg>
    ),
    mail: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 3v18h24V3H0zm21 2H3v16h18V5zm-9 8.61L4.47 9.41 3 10.72l8 7.19 8-7.19-.47-1.31L12 13.61z" />
      </svg>
    ),
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1 className="contact-title">Contact Me</h1>
        <p className="contact-desc">Here are the ways you can reach me directly</p>

        <div className="contact-list">
          {contacts.map((c) => (
            <a
              key={c.id}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <div className="contact-icon">{Icons[c.icon]}</div>
              <div className="contact-info">
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
