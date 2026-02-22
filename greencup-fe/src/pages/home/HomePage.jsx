import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home_container">

      {/* ===== HERO SECTION ===== */}
      <section className="home_hero">

        <div className="home_hero_left">
          <h1>
            <span className="green">그린컵</span>이란?
          </h1>

          {/* 🔥 프로세스 이미지로 교체 */}
          <div className="home_process_image">
            <img
              src="/img/home/greencup-process.png"
              alt="그린컵 순환 프로세스"
            />
          </div>

          <p className="home_description">
            그린컵은 매장에서 빌리고, 다시 돌려주는<br />
            공공 다회용컵 순환 시스템입니다.
          </p>
        </div>

        <div className="home_hero_right">
          <img
            src="/img/home/hero-image.jpg"
            alt="그린컵 메인 이미지"
          />
        </div>

      </section>


      {/* ===== PARTNER MAP SECTION ===== */}
      <section className="home_map_section">
        <h2>제휴 매장 확인하기</h2>

        <div className="home_map_card">
          <img
            src="/img/home/map-banner.jpg"
            alt="리유저블컵 매장 지도"
          />
          <div className="map_overlay">
            <h3>
              주변의 가까운<br />
              <span>리유저블컵 매장</span>을 찾아보세요!
            </h3>
          </div>
        </div>
      </section>


      {/* ===== NOTICE & NEWS SECTION ===== */}
      <section className="home_bottom_section">

        <div className="home_notice">
          <h2>공지사항</h2>
          <div className="card_placeholder"></div>
        </div>

        <div className="home_photo_news">
          <h2>포토뉴스</h2>
          <div className="photo_cards">
            <div className="photo_card"></div>
            <div className="photo_card"></div>
          </div>
        </div>

        <div className="home_other">
          <h2>다른 거</h2>
          <div className="card_placeholder large"></div>
        </div>

      </section>

    </div>
  );
}