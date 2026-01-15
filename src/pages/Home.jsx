// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import "../styles/home.css";

// Move CustomEmoji component outside - Fix React hooks error
const CustomEmoji = ({ src, alt, size = '24px' }) => (
  <img src={src} alt={alt} className="custom-emoji" style={{ width: size, height: size }} />
);

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const audioRef = useRef(null);
  const navRefs = useRef({});

  // Cursor trail effect - Sparkle
  useEffect(() => {
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✦', '◆', '◈'];
    
    const handleMouseMove = (e) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      
      // Random sparkle emoji
      const randomEmoji = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
      trail.innerHTML = `<span style="position: absolute; font-size: ${12 + Math.random() * 8}px;">${randomEmoji}</span>`;
      
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.remove();
      }, 800);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update indicator position
  useEffect(() => {
    const activeNav = navRefs.current[activeSection];
    if (activeNav) {
      const { offsetLeft, offsetWidth } = activeNav;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeSection]);

  // Discord Emojis - Extended
  const Emojis = {
    react: "https://cdn.discordapp.com/emojis/1443758487032168448.png?v=1",
    nodejs: "https://cdn.discordapp.com/emojis/1443758193380425789.png?v=1",
    html: "https://cdn.discordapp.com/emojis/1440752740807475384.png?v=1",
    python: "https://cdn.discordapp.com/emojis/1389728744851116112.png?v=1",
    typescript: "https://cdn.discordapp.com/emojis/1443757947883622534.png?v=1",
    // Custom emojis for content
    whiteheart: "https://cdn.discordapp.com/emojis/1444808619639177437.png?v=1",
    pinkheart: "https://cdn.discordapp.com/emojis/1234567890123456790.png?v=1",
    setting: "https://cdn.discordapp.com/emojis/1450531350472954069.png?v=1",
    dauthang: "https://cdn.discordapp.com/emojis/1442214345508651249.png?v=1",
    features: "https://cdn.discordapp.com/emojis/1442214375158054942.png?v=1",
    star: "https://cdn.discordapp.com/emojis/1440038819314532464.png?v=1",
    contact: "https://cdn.discordapp.com/emojis/1417434525671231502.png?v=1",
    Love: "https://cdn.discordapp.com/emojis/1430847630233309216.png?v=1",
  };

  const hideOverlay = () => {
    const overlay = document.querySelector('.overlay_audio');
    if (overlay) {
      overlay.classList.add('fade-out');
      
      setTimeout(() => {
        setShowOverlay(false);
      }, 1000);
    }
    
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Play failed:", err);
      });
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        const newVolume = 0.5;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Play failed:", err);
        });
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const translations = {
    nav: { home: 'Home', about: 'About', projects: 'Projects', discord: 'Discord', contact: 'Contact' },
    home: {
      title: 'Hi there! , I am Tira',
      intro1: 'I am <strong>a</strong> Full-Stack Developer specializing in <strong>Python</strong> and <strong>Node.js</strong>.',
      intro2: 'Also <strong>a seller</strong> on <strong>Discord</strong> with over <strong>2000+ legits</strong> in my shop.',
      intro3: ''
    },
    about: {
      title: 'About Me',
      titleEmoji: Emojis.whiteheart,
      intro: 'Hello! I\'m <strong>tira</strong>, a Full-Stack Developer with a passionate love for web technology. My programming journey started in 2020, and since then I have continuously learned and developed my skills.',
      experience: 'Work Experience',
      experienceEmoji: Emojis.dauthang,
      exp1: { 
        title: 'Senior Full-Stack Developer', 
        company: 'Tech Startup (2023 - Present)', 
        items: [
          'Develop and maintain large-scale web applications',
          'Optimize performance, reducing page load time by 40%',
          'Mentoring junior developers in the team'
        ] 
      },
      exp2: { 
        title: 'Full-Stack Developer', 
        company: 'Software Company (2021 - 2023)', 
        items: [
          'Build RESTful APIs with Node.js and Express',
          'Develop UI/UX with React and modern CSS',
          'Deploy and maintain applications on cloud platforms'
        ] 
      }
    },
    projects: {
      title: 'Featured Projects',
      titleEmoji: Emojis.features,
      freya: 'A versatile multipurpose bot designed to elevate your Discord server and DMs with powerful features and intuitive user-focused commands.',
      viewBtn: 'View Project'
    },
    contact: {
      title: 'Get In Touch',
      titleEmoji: Emojis.contact,
      intro: 'I\'m always open to discussing new projects, creative opportunities or collaborations. Whether you need a developer for your project, or just want to connect, feel free to reach out!',
      form: { 
        name: 'Your Name *', 
        email: 'Email *', 
        subject: 'Subject', 
        message: 'Your Message *', 
        submit: '📤 Send Message' 
      }
    }
  };

  const t = translations;

  const sections = {
    home: (
      <div id="home" className={`content-row ${activeSection === 'home' ? 'active' : ''}`}>
        <h2>{t.home.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: t.home.intro1 }}></p>
        <p dangerouslySetInnerHTML={{ __html: t.home.intro2 }}></p>

        {/* Image Container Example */}
        <div className="content-image-container">
          <img src="https://cdn.discordapp.com/attachments/1395671984779694091/1395715459092975756/d12.png?ex=69696b90&is=69681a10&hm=0e09ebf9d76dcbcd8dd055645d7b375393305b7f785a032ea526bb7fcdac52e4" alt="Line 1" />
        </div>

        {/* Text with custom emoji */}
        <p className="text-with-emoji">
          <CustomEmoji src={Emojis.Love} alt="Love" />
          I specialize in Python and Node.js. With experience in developing both frontend and backend, I create comprehensive web solutions, from beautiful user interfaces to robust backend systems.
        </p>

        {/* Another Image */}
        <div className="content-image-container">
          <img src="https://cdn.discordapp.com/attachments/1395671984779694091/1395715553901019169/d16.png?ex=69696ba7&is=69681a27&hm=3016e18d5907175f14899772e032145efba2614281f7289a5369066cc85802b6" alt="Line 2" />
        </div>

        <p dangerouslySetInnerHTML={{ __html: t.home.intro3 }}></p>
      </div>
    ),
    about: (
      <div id="about" className={`content-row ${activeSection === 'about' ? 'active' : ''}`}>
        <h2 className="text-with-emoji">
          <CustomEmoji src={t.about.titleEmoji} alt="White Heart" size="26px" />
          {t.about.title}
        </h2>
        <p style={{ marginTop: '15px' }} dangerouslySetInnerHTML={{ __html: t.about.intro }}></p>

        <h3 className="text-with-emoji" style={{ marginTop: '25px', fontSize: '1.3rem', color: '#f9fafb', borderBottom: '2px solid #f9fafb', display: 'inline-flex', paddingBottom: '5px', alignItems: 'center', gap: '8px' }}>
          <CustomEmoji src={t.about.experienceEmoji} alt="Experience" size="22px" />
          {t.about.experience}
        </h3>
        <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(28, 27, 28, 0.3)', backdropFilter: 'blur(5px)', borderRadius: '8px' }}>
          <p><strong>{t.about.exp1.title}</strong> - {t.about.exp1.company}<br/>{t.about.exp1.items.map((item, i) => (<span key={i}>• {item}<br/></span>))}</p>
          <p style={{ marginTop: '15px' }}><strong>{t.about.exp2.title}</strong> - {t.about.exp2.company}<br/>{t.about.exp2.items.map((item, i) => (<span key={i}>• {item}<br/></span>))}</p>
        </div>
      </div>
    ),
    projects: (
      <div id="projects" className={`content-row ${activeSection === 'projects' ? 'active' : ''}`}>
        <h2 className="text-with-emoji">
          <CustomEmoji src={t.projects.titleEmoji} alt="Rocket" size="26px" />
          {t.projects.title}
        </h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3><img src="https://www.freyabot.site/assets/images/icon.png" alt="Freya Bot" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />Freya Bot</h3>
            <p>{t.projects.freya}</p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 8px', background: 'rgba(28, 27, 28, 0.3)', backdropFilter: 'blur(5px)', borderRadius: '4px', fontSize: '0.85rem' }}>Discord.py</span>
            </div>
            <a href="https://www.freyabot.site/" target="_blank" rel="noopener noreferrer" className="project-btn">{t.projects.viewBtn}</a>
          </div>
        </div>
      </div>
    ),
    contact: (
      <div id="contact" className={`content-row ${activeSection === 'contact' ? 'active' : ''}`}>
        <h2 className="text-with-emoji">
          <CustomEmoji src={t.contact.titleEmoji} alt="Heart" size="26px" />
          {t.contact.title}
        </h2>
        <p style={{ marginTop: '15px' }}>{t.contact.intro}</p>
        <form className="contact-form">
          <input type="text" placeholder={t.contact.form.name} required />
          <input type="email" placeholder={t.contact.form.email} required />
          <input type="text" placeholder={t.contact.form.subject} />
          <textarea placeholder={t.contact.form.message} rows="6" required></textarea>
          <button type="submit">{t.contact.form.submit}</button>
        </form>
      </div>
    )
  };

  return (
    <>
      {showOverlay && (
        <div className="overlay_audio" onClick={hideOverlay}>
          <div className="overlay-content">
            <p className="overlay-text">Click to Enter</p>
            <p className="overlay-subtext">Made by @swllette</p>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>

      <div className="portfolio-table-wrapper">
        <div className="portfolio-table">
          <div className="table-row header-row">
            <div className="logo-name-cell">
              <img src="/images/logo.png" alt="Tiramisu Cake" className="avatar-logo" onError={(e) => { e.target.src = 'https://i.pinimg.com/736x/9e/f3/18/9ef3185464c35378ac9a610e042d393a.jpg'; }} />
              <h1 className="site-title">Tiramisu Cake</h1>
            </div>
            <div className="menu-cell">
              <nav className="nav-menu">
                <div className="nav-indicator" style={indicatorStyle}></div>
                {Object.keys(t.nav).map((key) => {
                  if (key === 'discord') {
                    return (
                      <a
                        key={key}
                        ref={(el) => (navRefs.current[key] = el)}
                        className="nav-item"
                        href="/discord"
                      >
                        {t.nav[key]}
                      </a>
                    );
                  }
                  return (
                    <a
                      key={key}
                      ref={(el) => (navRefs.current[key] = el)}
                      className={`nav-item ${activeSection === key ? 'active' : ''}`}
                      onClick={() => handleSectionChange(key)}
                    >
                      {t.nav[key]}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="table-row main-content-row">
            <div className="socials-cell">
              <div className="socials-list">
                <a href="https://discord.com/users/1292557439845011617" target="_blank" rel="noopener noreferrer" className="social-icon" title="Discord">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  <span>fufuyaunn</span>
                </a>
                <a href="https://github.com/cirearmelew" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span>cirearmelew</span>
                </a>
              </div>
              
              {/* Audio Control at bottom of socials */}
              <div className="audio-control-bottom">
                <div className="volume-icon-wrapper" onClick={toggleAudio}>
                  <svg className="volumeIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <defs>
                      <mask id="volumeMedium">
                        <g fill="none" stroke="#fff" strokeWidth="4">
                          <path fill="#555" strokeLinejoin="round" d="M24 6v36c-7 0-12.201-9.16-12.201-9.16H6a2 2 0 0 1-2-2V17.01a2 2 0 0 1 2-2h5.799S17 6 24 6Z" />
                          {isPlaying && (
                            <>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M32 15a12 12 0 0 1 1.684 1.859A12.07 12.07 0 0 1 36 24c0 2.654-.846 5.107-2.278 7.09A12 12 0 0 1 32 33" />
                              <path strokeLinecap="round" d="M34.236 41.186C40.084 37.696 44 31.305 44 24c0-7.192-3.796-13.496-9.493-17.02" />
                            </>
                          )}
                        </g>
                      </mask>
                    </defs>
                    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#volumeMedium)" />
                  </svg>
                </div>
                <div className="slider-container">
                  <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
                </div>
              </div>
            </div>
            <div className="content-cell">
              <div className="sections-container">
                {sections.home}
                {sections.about}
                {sections.projects}
                {sections.contact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;