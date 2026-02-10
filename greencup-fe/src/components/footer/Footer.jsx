import "./Footer.css";

export default function Footer() {
  return (
    // footer: 페이지 하단에 고정되는 공통 영역
    <footer className="footer">
      {/* footer 내부 콘텐츠 정렬을 위한 컨테이너 */}
      <div className="footer-inner">
        
        {/* 상단 영역: 브랜드 + 크레딧 정보 */}
        <div className="footer-top">
          
          {/* 브랜드 영역: 로고 + 서비스명 */}
          <div className="footer-brand">
            {/* public 폴더에 있는 로고 이미지 */}
            <img
              src="/img/greencup_login_logo.png"
              alt="Greencup logo"
              className="footer-logo"
            />
            {/* 서비스 이름 텍스트 */}
            <span className="footer-title">Greencup</span>
          </div>

          {/* 크레딧 영역: 팀 정보 표시 */}
          <div className="footer-credit">
            <p>Eco Crew</p>
            <p>남기정 · 김준성 · 김주연</p>
          </div>
        </div>

        {/* 하단 영역: 저작권 문구 */}
        <div className="footer-bottom">
          <p>Copyright © Greencup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
