import "./Table.css";

//수거지점장- 요청현황 검색결과 데이터 테이블
export default function Table() {
  return (
    <>
      <div class="container text-center mb-2">
        <table class="table align-middle table-hover custom-table">
          <thead
            id="table-header"
            class="table-group-divider fw-normal"
          ></thead>
          <tbody id="table-body" class="table-group-divider fw-light"></tbody>
        </table>
      </div>
    </>
  );
}
