import React, { useState, useEffect } from 'react';

const DiscordProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [profileData, setProfileData] = useState(null);
  const [legitsData, setLegitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const aboutData = {
    description: "https://discord.gg/9WV3zzSbwb https://t.me/cloudramel :telegram: contact tg : swllette",
    connections: [
      { platform: "GitHub", username: "cirearmelew", url: "https://github.com/cirearmelew", icon: "" },
      { platform: "Website", username: "ciela.sbs", url: "https://ciela.sbs", icon: "" }
    ]
  };

  const serverData = [
    {
      name: "(• ε •)﹒ɞ˚ .gg/yukiisito ",
      icon: "https://cdn.discordapp.com/icons/1379377249203130479/8e64a694e091cc632e417b81458e3559.webp?size=1024",
      members: "1500+",
      role: "Owner",
      description: "A cozy community server",
      invite: "https://discord.gg/yukiisito"
    },
    {
      name: "Cloudera Stocks",
      icon: "https://cdn.discordapp.com/icons/1444704591013740709/808d055ab76a6c0acd8579d57d3c3741.webp?size=1024",
      members: "400+",
      role: "Owner",
      description: "Trading & stocks discussion",
      invite: "https://discord.gg/clouderastocks"
    }
  ];

  useEffect(() => {
    const userId = '1292557439845011617';
    const apiUrl = `http://n1.poffipie.xyz:10003/api/presence/${userId}`;
    const legitsUrl = 'http://n1.poffipie.xyz:10003/api/feedback';

    // Disable scroll trên body
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    const fetchData = async () => {
      try {
        const cachedProfile = sessionStorage.getItem('discord_profile');
        const cachedLegits = sessionStorage.getItem('discord_legits');
        const cacheTime = sessionStorage.getItem('discord_cache_time');
        
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

    // Cleanup khi unmount
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
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
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1c1b1c',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <p style={{ fontSize: '1.5rem' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      background: '#1c1b1c',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Back Button */}
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'rgba(42, 40, 41, 0.8)',
          backdropFilter: 'blur(10px)',
          color: '#f9fafb',
          textDecoration: 'none',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '2px solid #3a3839',
          fontWeight: 600,
          transition: 'all 0.3s',
          width: 'fit-content'
        }}>
          <span>←</span> Back to Home
        </a>

        {/* Profile Card - FIXED SIZE */}
        <div 
          style={{
            background: '#2a2829',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            border: '3px solid #3a3839',
            position: 'relative',
            width: '1200px',
            height: '800px',
            flexShrink: 0
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background border effect - Below banner */}
          <div style={{
            position: 'absolute',
            top: '200px',
            left: 0,
            right: 0,
            height: '600px',
            backgroundImage: 'url(/images/background_border.png)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.6s',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Banner */}
          <div style={{
            height: '200px',
            backgroundImage: profileData.banner ? `url(${profileData.banner})` : 'none',
            backgroundColor: profileData.banner_color || '#5865f2',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />

          {/* Main Layout - FIXED DIMENSIONS */}
          <div style={{
            display: 'flex',
            position: 'relative',
            zIndex: 2,
            height: '600px',
            overflow: 'hidden'
          }}>
            {/* LEFT SIDE - FIXED 350px */}
            <div style={{
              width: '350px',
              flexShrink: 0,
              padding: '30px',
              borderRight: '2px solid #3a3839',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              overflow: 'hidden'
            }}>
              {/* Avatar Section */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '-80px'
              }}>
                <div style={{ position: 'relative', marginBottom: '15px' }}>
                  {profileData.avatar_decoration && (
                    <img 
                      src={profileData.avatar_decoration} 
                      alt="decoration"
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '-10px',
                        width: '140px',
                        height: '140px',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                  <img 
                    src={profileData.server_avatar || profileData.avatar} 
                    alt={profileData.username}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      border: '6px solid #2a2829',
                      display: 'block',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '4px solid #2a2829',
                    zIndex: 3,
                    background: profileData.status === 'online' ? '#23a559' : 
                               profileData.status === 'idle' ? '#f0b232' :
                               profileData.status === 'dnd' ? '#f23f43' : '#80848e'
                  }} />
                </div>

                <div style={{ textAlign: 'center', width: '100%' }}>
                  <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 0 5px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '290px'
                  }}>
                    {profileData.global_name || profileData.display_name}
                  </h1>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#b5bac1',
                    margin: '0 0 12px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '290px'
                  }}>
                    {profileData.username}
                    {profileData.discriminator !== '0' && `#${profileData.discriminator}`}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '8px'
                  }}>
                    {profileData.clan_badge && profileData.clan_tag && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(88, 101, 242, 0.2)',
                        borderRadius: '8px',
                        border: '1px solid rgba(88, 101, 242, 0.3)'
                      }}>
                        <img src={profileData.clan_badge} alt={profileData.clan_tag} style={{ width: '20px', height: '20px' }} />
                        <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{profileData.clan_tag}</span>
                      </div>
                    )}
                    {profileData.user_flags?.map((flag, i) => (
                      <span key={i} style={{
                        fontSize: '1.3rem',
                        padding: '6px 10px',
                        background: 'rgba(88, 101, 242, 0.15)',
                        borderRadius: '8px',
                        transition: 'all 0.3s'
                      }} title={flag}>
                        {getBadgeIcon(flag)}
                      </span>
                    ))}
                    {profileData.is_boosting && (
                      <span style={{
                        fontSize: '1.3rem',
                        padding: '6px 10px',
                        background: 'rgba(88, 101, 242, 0.15)',
                        borderRadius: '8px'
                      }} title="Server Booster">💎</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ width: '100%', height: '1px', background: '#3a3839', margin: '10px 0' }} />
            </div>

            {/* RIGHT SIDE - FIXED 850px */}
            <div style={{
              width: '850px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Tabs */}
              <div style={{
                display: 'flex',
                borderBottom: '2px solid #3a3839',
                flexShrink: 0,
                background: '#2a2829'
              }}>
                {['about', 'server', 'legits'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '18px 30px',
                      background: 'none',
                      border: 'none',
                      color: activeTab === tab ? '#fff' : '#b5bac1',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textTransform: 'capitalize',
                      borderBottom: activeTab === tab ? '2px solid #5865f2' : '2px solid transparent',
                      marginBottom: '-2px'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content - FIXED 850px width, scrollable */}
              <div style={{
                width: '850px',
                height: '542px',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '30px',
                background: 'rgba(28, 27, 28, 0.2)'
              }}>
                {activeTab === 'about' && (
                  <div style={{ width: '790px' }}>
                    <div style={{
                      marginBottom: '20px',
                      padding: '20px',
                      background: 'rgba(28, 27, 28, 0.5)',
                      borderRadius: '12px',
                      border: '1px solid transparent'
                    }}>
                      <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', margin: '0 0 10px 0' }}>Description</h3>
                      <p style={{ 
                        color: '#b5bac1', 
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word'
                      }}>{aboutData.description}</p>
                    </div>

                    <div style={{
                      marginBottom: '20px',
                      padding: '20px',
                      background: 'rgba(28, 27, 28, 0.5)',
                      borderRadius: '12px',
                      border: '1px solid transparent'
                    }}>
                      <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', margin: '0 0 10px 0' }}>Member Since</h3>
                      <p style={{ 
                        color: '#b5bac1',
                        fontSize: '0.85rem',
                        margin: 0
                      }}>
                        {formatDate(profileData.created_at)}
                      </p>
                    </div>

                    <div style={{
                      padding: '20px',
                      background: 'rgba(28, 27, 28, 0.5)',
                      borderRadius: '12px',
                      border: '1px solid transparent'
                    }}>
                      <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px', margin: '0 0 15px 0' }}>Connections</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {aboutData.connections.map((conn, i) => (
                          <a 
                            key={i}
                            href={conn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '15px',
                              background: 'rgba(28, 27, 28, 0.5)',
                              borderRadius: '10px',
                              textDecoration: 'none',
                              transition: 'all 0.3s',
                              border: '1px solid transparent'
                            }}
                          >
                            <span style={{ fontSize: '1.5rem' }}>{conn.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ color: '#b5bac1', fontSize: '0.85rem', margin: '0 0 4px 0' }}>{conn.platform}</p>
                              <p style={{ 
                                color: '#fff', 
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                margin: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>{conn.username}</p>
                            </div>
                            <span style={{ color: '#b5bac1' }}>→</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'server' && (
                  <div style={{ width: '790px' }}>
                    {serverData.map((server, i) => (
                      <div key={i} style={{
                        padding: '20px',
                        background: 'rgba(28, 27, 28, 0.5)',
                        borderRadius: '12px',
                        border: '1px solid transparent',
                        marginBottom: '15px'
                      }}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                          <img 
                            src={server.icon} 
                            alt={server.name}
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '16px',
                              objectFit: 'cover',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{
                              color: '#fff',
                              fontSize: '1.2rem',
                              marginBottom: '8px',
                              margin: '0 0 8px 0',
                              fontWeight: 700,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>{server.name}</h3>
                            <p style={{ 
                              color: '#b5bac1', 
                              fontSize: '0.9rem',
                              margin: '0 0 8px 0',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {server.description}
                            </p>
                            <p style={{ color: '#b5bac1', fontSize: '0.85rem', margin: 0 }}>
                              👥 {server.members} Members <span style={{ margin: '0 8px', color: '#3a3839' }}>|</span>
                              <span style={{ color: '#5865f2', fontWeight: 600 }}>Role: {server.role}</span>
                            </p>
                          </div>
                        </div>
                        <a 
                          href={server.invite}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px',
                            background: '#5865f2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            textAlign: 'center',
                            textDecoration: 'none'
                          }}
                        >
                          Join Server
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'legits' && (
                  <div style={{ width: '790px' }}>
                    {legitsData.map((legit) => (
                      <div key={legit.id} style={{
                        padding: '20px',
                        background: 'rgba(28, 27, 28, 0.5)',
                        borderRadius: '12px',
                        transition: 'all 0.3s',
                        border: '1px solid transparent',
                        marginBottom: '15px'
                      }}>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                          <img 
                            src={legit.avatar} 
                            alt={legit.username}
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{
                              color: '#fff',
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              margin: '0 0 5px 0',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>{legit.displayName || legit.username}</h4>
                            <p style={{ 
                              color: '#b5bac1', 
                              fontSize: '0.85rem',
                              margin: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>@{legit.username}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i} 
                                style={{
                                  fontSize: '1.2rem',
                                  color: i < legit.star ? '#ffc107' : '#3a3839'
                                }}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>

                        <p style={{ 
                          color: '#fff', 
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          marginBottom: '8px',
                          margin: '0 0 8px 0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word'
                        }}>{legit.message}</p>
                        {legit.comment && (
                          <p style={{ 
                            color: '#b5bac1', 
                            fontSize: '0.85rem',
                            marginBottom: '12px',
                            margin: '0 0 12px 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word'
                          }}>{legit.comment}</p>
                        )}

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '12px',
                          borderTop: '1px solid #3a3839'
                        }}>
                          <span style={{ color: '#b5bac1', fontSize: '0.85rem' }}>
                            {new Date(legit.timestamp * 1000).toLocaleDateString()}
                          </span>
                          <a 
                            href="http://n1.poffipie.xyz:10003/feedback"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#5865f2',
                              textDecoration: 'none',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              flexShrink: 0
                            }}
                          >
                            View Vouch →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordProfile;