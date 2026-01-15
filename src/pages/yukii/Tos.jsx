import "../../styles/tos.css";

// Define EmojiImg outside of the component to avoid recreation on render
const EmojiImg = ({ src, alt, className = "tos-emoji" }) => (
  <img src={src} alt={alt} className={className} style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '6px' }} />
);

export default function YukiiTOS() {
  const dodootEmoji = "https://cdn.discordapp.com/emojis/1402734385031155906.png?v=1"; // <:ys_dodoot:1402734385031155906>
  const mtmuitenEmoji = "https://cdn.discordapp.com/emojis/1401289594141540504.gif?v=1"; // <a:ys_mtmuiten:1401289594141540504> animated
  const khchamhoiEmoji = "https://cdn.discordapp.com/emojis/1401303910215323668.gif?v=1"; // <a:ys_khchamhoi:1401303910215323668> animated
  const khrulesEmoji = "https://cdn.discordapp.com/emojis/1401304483345993759.png?v=1"; // <:ys_khrules:1401304483345993759>
  const khtosEmoji = "https://cdn.discordapp.com/emojis/1401304505684852807.png?v=1"; // <:ys_khtos:1401304505684852807>

  // Service emojis
  const nitroLoginEmoji = "https://cdn.discordapp.com/emojis/1401242709737341181.png?v=1"; // <:ys_DVN1tr0_Badge:1401242709737341181>
  const boostServerEmoji = "https://cdn.discordapp.com/emojis/1401291605314502847.gif?v=1"; // <a:ys_DVboostserver:1401291605314502847> animated
  const nitroGiftEmoji = "https://cdn.discordapp.com/emojis/1401242717366911057.png?v=1"; // <:ys_DV0ne_B00st:1401242717366911057>
  const youtubeEmoji = "https://cdn.discordapp.com/emojis/1401243023626604555.png?v=1"; // <:ys_DVYouTube:1401243023626604555>
  const spotifyEmoji = "https://cdn.discordapp.com/emojis/1401290189363744849.png?v=1"; // <:ys_DVspotify:1401290189363744849>
  const decorationEmoji = "https://cdn.discordapp.com/emojis/1401258675070439447.png?v=1"; // <:ys_DVdecortrangtri:1401258675070439447>
  const netflixEmoji = "https://cdn.discordapp.com/emojis/1401243031729864836.png?v=1"; // <:ys_DVNetflix:1401243031729864836>

  return (
    <div className="tos-root">
      <div className="tos-wrapper">

        {/* HEADER */}
        <div className="tos-card header">
          <div className="tos-header">
            <img
              className="tos-thumb"
              src="https://cdn.discordapp.com/icons/1369620446798024775/1d133413a057cd7fd8f0b5975a4da783.webp?size=4096"
              alt="server"
            />
            <h1>
              <EmojiImg src={khchamhoiEmoji} alt="khchamhoi" /> Terms of Service
            </h1>
          </div>

          <img
            className="tos-banner"
            src="https://i.imgur.com/BbRZmOT.gif"
            alt="banner"
          />
        </div>

        {/* RULES */}
        <div className="tos-card half">
          <h2>
            <EmojiImg src={khrulesEmoji} alt="khrules" />Server Rules
          </h2>
          <ul>
            <li key="rule1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Tôn Trọng Các Staff Trong Server</strong></li>
            <li key="rule2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Nói Chuyện Văn Mình - Có Ý Thức</strong></li>
            <li key="rule3"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Tuân thủ TOS của Discord.</strong></li>
          </ul>
        </div>

        <div className="tos-card half">
          <h2>
            <EmojiImg src={khtosEmoji} alt="khtos" />Điều Khoản Chung
          </h2>
          <div className="tos-meta-text">
            <h3>Đọc Quy Tắc Mua Hàng Ở Bên Dưới</h3>
            <ul>
              <li key="term1"><EmojiImg src={mtmuitenEmoji} alt="mtmuiten" /><strong>Mua Hàng Xong Out Server = Mất Hoàn Toàn Quyền Bảo Hành</strong></li>
              <li key="term2"><EmojiImg src={mtmuitenEmoji} alt="mtmuiten" /><strong>Không Refund - Chỉ Bảo Hành Hoặc Thay Mới, Không Hỗ Trợ Hoàn Tiền</strong></li>
              <li key="term3"><EmojiImg src={mtmuitenEmoji} alt="mtmuiten" /><strong>Muốn Refund Thì Chấp Nhận Mất 60% Số Tiền Đã Đặt Đơn Đó</strong></li>
              <li key="term4"><EmojiImg src={mtmuitenEmoji} alt="mtmuiten" /><strong>Nếu Dịch Vụ Lỗi Thì Cung Cấp Đủ Bằng Chứng, Nếu Không Sẽ Không Bảo Hành</strong></li>
              <li key="term5">
                  <EmojiImg src={mtmuitenEmoji} alt="mtmuiten" />
                  <strong>
                    Mua Hàng Xong Không Vouch Ở{' '}
                    <a 
                      href="https://discord.com/channels/1379377249203130479/1443740708992188428" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#7289da', textDecoration: 'underline' }}
                    >
                        Channel Vouch
                    </a>{' '}
                    Sẽ Không Bảo Hành
                  </strong>
                </li>
              <li key="term5"><EmojiImg src={mtmuitenEmoji} alt="mtmuiten" /><strong>Chấp Nhận Mua Hàng = Chấp Nhận Điều Khoản</strong></li>
            </ul>
          </div>
        </div>

        {/* SERVICES */}
        <div className="tos-card service">
          <div className="service-title">
            <h3 key="nitro">
              <EmojiImg src={nitroLoginEmoji} alt="nitro-login" />Nitro Login
            </h3>
          </div>
          <ul>
            <li key="nitro1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>100% Bảo Hành</strong></li>
            <li key="nitro2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Hàng Chính Hãng Có Bill Không Lo Chuyện Thu Hồi</strong></li>
          </ul>
        </div>

        <div className="tos-card service">
          <div className="service-title">
            <h3 key="boost">
              <EmojiImg src={boostServerEmoji} alt="boost-server" />Boost Server
            </h3>
          </div>
          <ul>
            <li key="boost1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Có 25-31 days với 1month</strong></li>
            <li key="boost2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Có 75-90 days với 3month</strong></li>
          </ul>
          <p className="warn">Sẽ không hoàn tiền hoặc thay thế nếu:</p>
          <ul>
            <li key="warn1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Boost bị thu hồi</strong></li>
            <li key="warn2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Kick acc boosts</strong></li>
            <li key="warn3"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Đưa nhầm link server</strong></li>
            <li key="warn4"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Vẫn bật antiraid</strong></li>
            <li key="warn5"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Server bị limited</strong></li>
          </ul>
        </div>

        <div className="tos-card service">
          <div className="service-title">
            <h3 key="gift">
              <EmojiImg src={nitroGiftEmoji} alt="nitro-gift" />Nitro Gift
            </h3>
          </div>
          <ul>
            <li key="gift1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Không bảo hành khi bị revoke</strong></li>
            <li key="gift2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Không bảo hành khi chúng mình đã đưa link cho bạn, trước khi gửi mình đã check trước.</strong></li>
            <li key="gift3"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Không bảo hành khi bạn không claim trong vòng 48h</strong></li>
            <li key="gift4"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Không regen lại link trong mọi trường hợp.</strong></li>
          </ul>
        </div>

        <div className="tos-card service">
          <div className="service-title">
            <h3 key="yt">
              <EmojiImg src={youtubeEmoji} alt="youtube" />Youtube Premium
            </h3>
          </div>
          <ul>
            <li key="yt1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Bảo hành theo gói bạn mua</strong></li>
            <li key="yt2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Khi bị lỗi yêu cầu cung cấp: bill từ bot, mail của bạn, mail chủ family để bọn mình bảo hành</strong></li>
          </ul>
        </div>

        <div className="tos-card service">
          <div className="service-title">
            <h3 key="spotify">
              <EmojiImg src={spotifyEmoji} alt="spotify" />Spotify Premium
            </h3>
          </div>
          <ul>
            <li key="spotify1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Bảo hành theo gói bạn mua</strong></li>
            <li key="spotify2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Khi bị lỗi yêu cầu cung cấp: bill từ bot, hình ảnh mất premium để bọn mình bảo hành</strong></li>
          </ul>
        </div>

        <div className="tos-card service">
          <div className="service-title">
            <h3 key="dec">
              <EmojiImg src={decorationEmoji} alt="decoration" />Decoration
            </h3>
          </div>
          <ul>
            <li key="dec1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Sau khi mình dùng bot gửi bill và có link decoration gift, bạn phải claim ngay. Sau đó mình sẽ không chịu trách nhiệm vì đó là link private chỉ mình và bạn biết.</strong></li>
            <li key="dec2"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Quay video đã claim để bảo vệ quyền lợi của bạn</strong></li>
            <li key="dec3"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Đã gửi quá 48h link bị hết hạn, mình sẽ không bảo hành nữa.</strong></li>
            <li key="dec4"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Hàng này là dạng legal paid nên không lo bị revoke. 100% đổi mới nếu bị revoke.</strong></li>
          </ul>
        </div>

        {/* NETFLIX (CENTER) */}
        <div className="tos-card center">
          <div className="service-title">
            <h3 key="netflix">
              <EmojiImg src={netflixEmoji} alt="netflix" />Netflix Premium
            </h3>
          </div>
          <ul>
            <li key="netflix1"><EmojiImg src={dodootEmoji} alt="dodoot" /><strong>Tài khoản sẽ được bảo hành theo đúng số tháng (số ngày mà bạn mua) kể từ ngày mua hàng và sẽ bảo hành full time cho tài khoản của bạn.</strong></li>
          </ul>
        </div>

      </div>
    </div>
  );
}