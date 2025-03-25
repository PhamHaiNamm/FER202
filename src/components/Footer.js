import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        Phim chất lượng cao online của <span className="highlight">XemPhim</span> khác gì so với các trang phim khác?
      </h3>
      <ul>
        <li>📀 Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p).</li>
        <li>🎞️ Chất lượng cao, bitrate cao gấp 5 - 10 lần phim online thông thường.</li>
        <li>🔊 Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang khác.</li>
        <li>🖥️ Phù hợp để xem trên TV, máy tính, laptop có độ phân giải cao.</li>
        <li>📂 Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề riêng.</li>
        <li>🌐 Có lựa chọn hiển thị phụ đề song ngữ (Anh & Việt) phù hợp cho người học ngoại ngữ.</li>
      </ul>
    </div>
  );
};

export default Footer;
