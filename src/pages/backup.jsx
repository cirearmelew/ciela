// Discord.jsx (Đã sửa thêm: Cố định width explicit cho card và layout dựa trên Home.jsx reference - fixed structure với min-width cho right-side, tránh reflow)
// Các thay đổi: 
// - .discord-profile-card: width: 100%; max-width: 1200px; (khớp container)
// - .discord-main-layout: width: 100%; min-width: calc(350px + 650px); (left fixed + right min cho tab rộng nhất)
// - .discord-right-side: min-width: 650px; (đủ cho server/legits items, tránh co giãn)
// - .discord-tab-content: min-height: 500px; (fixed height như Home's calc, + overflow-y để nội dung không push width)

import React, { useState, useEffect } from 'react';

// Inline CSS để tránh conflict với home.css
const styles = `
  .discord-profile-wrapper * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .discord-profile-wrapper {
    min-height: 100vh;
    background: #1c1b1c;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  /* Background */
  .discord-profile-wrapper::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.25;
    z-index: 0;
    pointer-events: none;
  }

  .discord-profile-container {
    max-width: 1200px;
    width: 100%; /* Đã sửa thêm: Explicit width để fixed scale ngang */
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Back Button */
  .discord-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(42, 40, 41, 0.8);
    backdrop-filter: blur(10px);
    color: #f9fafb;
    text-decoration: none;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 2px solid #3a3839;
    font-weight: 600;
    transition: all 0.3s;
  }

  .discord-back-btn:hover {
    background: rgba(42, 40, 41, 1);
    border-color: #f9fafb;
    transform: translateX(-5px);
  }

  /* Profile Card */
  .discord-profile-card {
    background: #2a2829;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    border: 3px solid #3a3839;
    position: relative;
    width: 100%; /* Đã sửa thêm: Explicit width khớp container, tránh shrink-to-fit */
    max-width: 1200px; /* Giữ max, nhưng width:100% fixed scale */
  }

  /* Background border effect on hover - BELOW banner */
 .discord-profile-card::before {
    content: '';
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    height: 600px;
    background-image: url('/images/background_border.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center top;
    opacity: 0;
    transition: opacity 0.6s;
    pointer-events: none;
    z-index: 1;
  }

  .discord-profile-card:hover::before {
    opacity: 1;
  }

  /* Banner */
  .discord-banner {
    height: 200px;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  /* Main Layout: Left side fixed, Right side scrollable */
  .discord-main-layout {
    display: flex;
    position: relative;
    z-index: 2;
    min-height: 600px;
    width: 100%; /* Đã sửa thêm: Explicit width */
    min-width: calc(350px + 650px); /* Đã sửa thêm: Min-width fixed dựa trên left (350px) + right min cho tab rộng nhất (server/legits items ~650px min) */
  }

  /* Left Side - Fixed */
  .discord-left-side {
    width: 350px;
    flex-shrink: 0;
    padding: 30px;
    border-right: 2px solid #3a3839;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  /* Avatar Section */
  .discord-avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -80px;
  }

  .discord-avatar-wrapper {
    position: relative;
    margin-bottom: 15px;
  }

  .discord-avatar-decoration {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 140px;
    height: 140px;
    z-index: 2;
    pointer-events: none;
  }

  .discord-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 6px solid #2a2829;
    display: block;
    position: relative;
    z-index: 1;
  }

  .discord-status {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 4px solid #2a2829;
    z-index: 3;
  }

  .discord-status.online { background: #23a559; }
  .discord-status.idle { background: #f0b232; }
  .discord-status.dnd { background: #f23f43; }
  .discord-status.offline { background: #80848e; }

  /* User Info */
  .discord-user-info {
    text-align: center;
    width: 100%;
  }

  .discord-global-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 5px;
  }

  .discord-username {
    font-size: 1rem;
    color: #b5bac1;
    margin-bottom: 12px;
  }

  /* Clan & Badges Row */
  .discord-clan-badges {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .discord-clan-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(88, 101, 242, 0.2);
    border-radius: 8px;
    border: 1px solid rgba(88, 101, 242, 0.3);
  }

  .discord-clan-badge-img {
    width: 20px;
    height: 20px;
  }

  .discord-clan-text {
    color: #fff;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .discord-badge {
    font-size: 1.3rem;
    padding: 6px 10px;
    background: rgba(88, 101, 242, 0.15);
    border-radius: 8px;
    transition: all 0.3s;
  }

  .discord-badge:hover {
    transform: scale(1.15) rotate(5deg);
  }

  /* Divider */
  .discord-divider {
    width: 100%;
    height: 1px;
    background: #3a3839;
    margin: 10px 0;
  }

  /* Right Side - Scrollable */
  .discord-right-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    min-width: 650px; /* Đã sửa thêm: Min-width fixed cho right-side, đủ cho tab Server/Legits (như Home's fixed structure) */
    min-height: 500px; /* Đã sửa thêm: Min-height fixed để tránh push layout khi nội dung ngắn/dài */
  }

  /* Tab Navigation */
  .discord-tabs {
    display: flex;
    border-bottom: 2px solid #3a3839;
    flex-shrink: 0;
    background: #2a2829;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .discord-tab {
    padding: 18px 30px;
    background: none;
    border: none;
    color: #b5bac1;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    text-transform: capitalize;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
  }

  .discord-tab.active {
    color: #fff;
    border-bottom-color: #5865f2;
  }

  .discord-tab:hover {
    color: #fff;
    background: rgba(88, 101, 242, 0.1);
  }

  /* Tab Content - Scrollable */
  .discord-tab-content {
    flex: 1;
    overflow-y: auto;
    padding: 30px;
    background: rgba(28, 27, 28, 0.2);
    scrollbar-gutter: stable;
    min-height: 400px; /* Đã sửa thêm: Min-height để giữ layout fixed như Home's content-cell */
  }

  .discord-tab-content::-webkit-scrollbar {
    width: 8px;
  }

  .discord-tab-content::-webkit-scrollbar-track {
    background: #1c1b1c;
  }

  .discord-tab-content::-webkit-scrollbar-thumb {
    background: #3a3839;
    border-radius: 4px;
  }

  .discord-tab-content::-webkit-scrollbar-thumb:hover {
    background: #4a4849;
  }

  /* Section Box */
  .discord-section {
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(42, 40, 41, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 12px;
    border: 1px solid #3a3839;
  }

  .discord-section-title {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .discord-section-text {
    color: #b5bac1;
    line-height: 1.8;
    margin: 0;
  }

  .discord-section-date {
    color: #b5bac1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Connections */
  .discord-connections {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .discord-connection-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: rgba(28, 27, 28, 0.5);
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s;
    border: 1px solid transparent;
  }

  .discord-connection-item:hover {
    border-color: #5865f2;
    transform: translateX(5px);
  }

  .discord-connection-icon {
    font-size: 1.5rem;
  }

  .discord-connection-info {
    flex: 1;
  }

  .discord-connection-platform {
    color: #b5bac1;
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .discord-connection-username {
    color: #fff;
    font-weight: 500;
  }

  /* Server Item */
  .discord-server-item {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: rgba(28, 27, 28, 0.5);
    border-radius: 12px;
    transition: all 0.3s;
    border: 1px solid transparent;
    margin-bottom: 15px;
  }

  .discord-server-item:hover {
    border-color: #5865f2;
  }

  .discord-server-icon {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    object-fit: cover;
    flex-shrink: 0; /* Đã sửa thêm: Ngăn icon co giãn */
  }

  .discord-server-info {
    flex: 1;
    min-width: 0; /* Đã sửa thêm: Cho phép wrap text nếu cần, tránh push width */
  }

  .discord-server-name {
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 10px;
    font-weight: 700;
    white-space: nowrap; /* Đã sửa thêm: Ngăn tên server wrap, giữ width fixed */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .discord-server-stats {
    color: #b5bac1;
    font-size: 0.95rem;
  }

  .discord-server-role {
    color: #5865f2;
    font-weight: 600;
  }

  /* Legit Item */
  .discord-legit-item {
    padding: 20px;
    background: rgba(28, 27, 28, 0.5);
    border-radius: 12px;
    transition: all 0.3s;
    border: 1px solid transparent;
    margin-bottom: 15px;
  }

  .discord-legit-item:hover {
    border-color: #5865f2;
  }

  .discord-legit-header {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }

  .discord-legit-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0; /* Đã sửa thêm: Ngăn avatar co giãn */
  }

  .discord-legit-user {
    flex: 1;
    min-width: 0; /* Đã sửa thêm: Cho phép wrap text */
  }

  .discord-legit-name {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
    white-space: nowrap; /* Đã sửa thêm: Ngăn tên wrap */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .discord-legit-username {
    color: #b5bac1;
    font-size: 0.85rem;
  }

  .discord-legit-stars {
    display: flex;
    gap: 2px;
  }

  .discord-legit-star {
    font-size: 1.2rem;
  }

  .discord-legit-message {
    color: #fff;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .discord-legit-comment {
    color: #b5bac1;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  .discord-legit-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid #3a3839;
  }

  .discord-legit-date {
    color: #b5bac1;
    font-size: 0.85rem;
  }

  .discord-legit-link {
    color: #5865f2;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .discord-legit-link:hover {
    text-decoration: underline;
  }

  /* Loading */
  .discord-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #fff;
    text-align: center;
  }

  .discord-loading-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .discord-loading-text {
    font-size: 1.5rem;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .discord-main-layout {
      flex-direction: column;
    }

    .discord-left-side {
      width: 100%;
      border-right: none;
      border-bottom: 2px solid #3a3839;
    }

    .discord-avatar-section {
      margin-top: -60px;
    }

    .discord-right-side {
      max-height: none;
      min-width: auto; /* Đã sửa thêm: Trên mobile, bỏ min-width để responsive */
    }

    .discord-profile-card {
      min-width: auto; /* Đã sửa thêm: Trên mobile, cho phép co giãn */
    }

    .discord-main-layout {
      min-width: auto; /* Đã sửa thêm: Trên mobile, cho phép co giãn */
    }
  }
`;

const Discord = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [profileData, setProfileData] = useState(null);
  const [legitsData, setLegitsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = '1292557439845011617';
  const apiUrl = `http://n1.poffipie.xyz:10003/api/presence/${userId}`;
  const legitsUrl = 'http://n1.poffipie.xyz:10003/api/feedback';

  const aboutData = {
    description: "https://discord.gg/9WV3zzSbwb https://t.me/cloudramel :telegram: contact tg : swllette",
    connections: [
      { platform: "GitHub", username: "cirearmelew", url: "https://github.com/cirearmelew", icon: "🔗" },
      { platform: "Website", username: "ciela.sbs", url: "https://ciela.sbs", icon: "🌐" }
    ]
  };

  const serverData = [
    {
      name: "(• ε •)﹒ʚ˚ .gg/yukiisito 🧁",
      icon: "https://cdn.discordapp.com/icons/1379377249203130479/8e64a694e091cc632e417b81458e3559.webp?size=1024",
      members: "1500+",
      role: "Owner"
    },
    {
      name: "Cloudera Stocks",
      icon: "https://cdn.discordapp.com/icons/1444704591013740709/808d055ab76a6c0acd8579d57d3c3741.webp?size=1024",
      members: "400+",
      role: "Owner"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load từ cache nếu có
        const cachedProfile = sessionStorage.getItem('discord_profile');
        const cachedLegits = sessionStorage.getItem('discord_legits');
        const cacheTime = sessionStorage.getItem('discord_cache_time');
        
        // Nếu có cache và chưa quá 5 phút
        if (cachedProfile && cachedLegits && cacheTime) {
          const now = Date.now();
          const fiveMinutes = 5 * 60 * 1000;
          
          if (now - parseInt(cacheTime) < fiveMinutes) {
            setProfileData(JSON.parse(cachedProfile));
            setLegitsData(JSON.parse(cachedLegits));
            setLoading(false);
            return;
          }
        }

        setLoading(true);
        const [profileRes, legitsRes] = await Promise.all([
          fetch(apiUrl),
          fetch(legitsUrl)
        ]);
        
        const profileJson = await profileRes.json();
        const legitsJson = await legitsRes.json();
        
        // Lưu vào cache
        sessionStorage.setItem('discord_profile', JSON.stringify(profileJson));
        sessionStorage.setItem('discord_legits', JSON.stringify(legitsJson));
        sessionStorage.setItem('discord_cache_time', Date.now().toString());
        
        setProfileData(profileJson);
        setLegitsData(legitsJson);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getBadgeIcon = (flag) => {
    const badges = {
      'Staff': '👮',
      'Partner': '🤝',
      'HypeSquad': '🎉',
      'HypeSquadOnlineHouse1': '💜',
      'HypeSquadOnlineHouse2': '❤️',
      'HypeSquadOnlineHouse3': '💚',
      'BugHunterLevel1': '🐛',
      'BugHunterLevel2': '🐛',
      'PremiumEarlySupporter': '💎',
      'VerifiedDeveloper': '✅',
      'CertifiedModerator': '⚖️',
      'ActiveDeveloper': '🛠️',
      'Nitro': '✨'
    };
    return badges[flag] || '⭐';
  };

  if (loading || !profileData) {
    return (
      <>
        <style>{styles}</style>
        <div className="discord-profile-wrapper">
          <div className="discord-loading">
            <div>
              <div className="discord-loading-icon">⏳</div>
              <p className="discord-loading-text">Loading profile...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="discord-profile-wrapper">
        <div className="discord-profile-container">
          <a href="/" className="discord-back-btn">
            <span>←</span> Back to Home
          </a>

          <div className="discord-profile-card">
            <div 
              className="discord-banner"
              style={{
                backgroundImage: profileData.banner ? `url(${profileData.banner})` : 'none',
                backgroundColor: profileData.banner_color || '#5865f2'
              }}
            />

            <div className="discord-main-layout">
              {/* LEFT SIDE - FIXED */}
              <div className="discord-left-side">
                <div className="discord-avatar-section">
                  <div className="discord-avatar-wrapper">
                    {profileData.avatar_decoration && (
                      <img 
                        src={profileData.avatar_decoration} 
                        alt="decoration"
                        className="discord-avatar-decoration"
                      />
                    )}
                    <img 
                      src={profileData.server_avatar || profileData.avatar} 
                      alt={profileData.username}
                      className="discord-avatar"
                    />
                    <div className={`discord-status ${profileData.status}`} />
                  </div>

                  <div className="discord-user-info">
                    <h1 className="discord-global-name">
                      {profileData.global_name || profileData.display_name}
                    </h1>
                    <p className="discord-username">
                      {profileData.username}
                      {profileData.discriminator !== '0' && `#${profileData.discriminator}`}
                    </p>

                    <div className="discord-clan-badges">
                      {profileData.clan_badge && profileData.clan_tag && (
                        <div className="discord-clan-tag">
                          <img src={profileData.clan_badge} alt={profileData.clan_tag} className="discord-clan-badge-img" />
                          <span className="discord-clan-text">{profileData.clan_tag}</span>
                        </div>
                      )}
                      {profileData.user_flags?.map((flag, i) => (
                        <span key={i} className="discord-badge" title={flag}>
                          {getBadgeIcon(flag)}
                        </span>
                      ))}
                      {profileData.is_boosting && (
                        <span className="discord-badge" title="Server Booster">💎</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="discord-divider" />
              </div>

              {/* RIGHT SIDE - SCROLLABLE */}
              <div className="discord-right-side">
                <div className="discord-tabs">
                  <button
                    className={`discord-tab ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </button>
                  <button
                    className={`discord-tab ${activeTab === 'server' ? 'active' : ''}`}
                    onClick={() => setActiveTab('server')}
                  >
                    Server
                  </button>
                  <button
                    className={`discord-tab ${activeTab === 'legits' ? 'active' : ''}`}
                    onClick={() => setActiveTab('legits')}
                  >
                    Legits
                  </button>
                </div>

                <div className="discord-tab-content">
                  {activeTab === 'about' && (
                    <>
                      <div className="discord-section">
                        <h3 className="discord-section-title">Description</h3>
                        <p className="discord-section-text">{aboutData.description}</p>
                      </div>

                      <div className="discord-section">
                        <h3 className="discord-section-title">Member Since</h3>
                        <p className="discord-section-date">
                          📅 {formatDate(profileData.created_at)}
                        </p>
                      </div>

                      <div className="discord-section">
                        <h3 className="discord-section-title">Connections</h3>
                        <div className="discord-connections">
                          {aboutData.connections.map((conn, i) => (
                            <a 
                              key={i}
                              href={conn.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="discord-connection-item"
                            >
                              <span className="discord-connection-icon">{conn.icon}</span>
                              <div className="discord-connection-info">
                                <p className="discord-connection-platform">{conn.platform}</p>
                                <p className="discord-connection-username">{conn.username}</p>
                              </div>
                              <span style={{ color: '#b5bac1' }}>→</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'server' && (
                    <>
                      {serverData.map((server, i) => (
                        <div key={i} className="discord-server-item">
                          <img 
                            src={server.icon} 
                            alt={server.name}
                            className="discord-server-icon"
                          />
                          <div className="discord-server-info">
                            <h3 className="discord-server-name">{server.name}</h3>
                            <p className="discord-server-stats">
                              👥 {server.members} Members <span style={{ margin: '0 8px', color: '#3a3839' }}>|</span>
                              <span className="discord-server-role">Role: {server.role}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {activeTab === 'legits' && (
                    <>
                      {legitsData.map((legit) => (
                        <div key={legit.id} className="discord-legit-item">
                          <div className="discord-legit-header">
                            <img 
                              src={legit.avatar} 
                              alt={legit.username}
                              className="discord-legit-avatar"
                            />
                            <div className="discord-legit-user">
                              <h4 className="discord-legit-name">{legit.displayName || legit.username}</h4>
                              <p className="discord-legit-username">@{legit.username}</p>
                            </div>
                            <div className="discord-legit-stars">
                              {[...Array(5)].map((_, i) => (
                                <span 
                                  key={i} 
                                  className="discord-legit-star"
                                  style={{ color: i < legit.star ? '#ffc107' : '#3a3839' }}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                          </div>

                          <p className="discord-legit-message">{legit.message}</p>
                          {legit.comment && (
                            <p className="discord-legit-comment">{legit.comment}</p>
                          )}

                          <div className="discord-legit-footer">
                            <span className="discord-legit-date">
                              {new Date(legit.timestamp * 1000).toLocaleDateString()}
                            </span>
                            {legit.link && (
                              <a 
                                href={legit.link} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="discord-legit-link"
                              >
                                View Message →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discord;