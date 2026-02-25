import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home_container">

      {/* ===== HERO SECTION ===== */}
      <section className="home_hero">

        <div className="home_hero_left">
          {/* <h1>
            <span className="green">그린컵</span>이란?
          </h1>

          
          <div className="home_process_image">
            <img
              src="/img/home/greencup-process.png"
              alt="그린컵 순환 프로세스"
            />
          </div>

          <p className="home_description">
            그린컵은 매장에서 빌리고, 다시 돌려주는<br />
            공공 다회용컵 순환 시스템입니다.
          </p> */}
        </div>

        <div className="home_hero_right">
        </div>

      </section>


      {/* ===== PARTNER MAP SECTION ===== */}
      <section className="home_map_section">
        <h2>그린컵 이용방법</h2>

        <div className="home_map_card">
        </div>
      </section>


      {/* ===== NOTICE & NEWS SECTION ===== */}
      <section className="home_bottom_section">

        <div className="home_notice">
          <h2>공지사항</h2>
          <div className="card_placeholder"></div>
        </div>

        <div className="home_photo_news">
          <h2>이벤트</h2>
          <div className="photo_card"></div>
        </div>

      </section>

    </div>
  );
}