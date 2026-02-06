import { useState, useEffect } from "react";

import "./ReuseOperatorPartnerManagePage.css";

import SearchContainer from "../../../components/reuse-operator/partner-manage/list/search/SearchContainer";
import SearchButton from "../../../components/reuse-operator/util/search-button/SearchButton";
import Table from "../../../components/reuse-operator/partner-manage/list/table/Table";
import Pagination from "../../../components/pagination/Pagination";

import { fetchReusePartners } from "../../../api/dummyReusePartners";

//수거지점장-업체관리-업체목록
export default function ReuseOperatorPartnerManagePage() {
  //제휴지점명
  const [partnerName, setPartnerName] = useState("");
  //맨 처음 랜딩시에는 전체, 검색시에는 검색결과 해당 필터링한 업체목록
  const [partners, setPartners] = useState([]);
  //현재 필터링한 요청항목들에 대한 개수
  const [partnerCount, setPartnerCount] = useState(0);
  //fetch로 불러올동안 로딩중 여부
  const [loading, setLoading] = useState(true);
  //무슨 페이지를 눌렀는지
  const [page, setPage] = useState(1);

  //input박스에 입력시마다 실행할 함수
  const partnerNameChange = (partnerName) => {
    setPartnerName(partnerName);
  };

  //전체목록 불러온후 상태관리하는 함수
  const handleFetchReusePartners = () => {
    fetchReusePartners().then((data) => {
      setPartners(data.partners);
      //console.log(data.partners);
      setPartnerCount(data.searchPartnerCount);
      setLoading(false);
    });
  };

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  //페이지네이션 페이지가 변화할때마다, 검색결과를 할때마다도
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 전체, 완료 갯수를 불러오기
    //fetch로 전체 요청 목록 불러오기

    handleFetchReusePartners();
  }, [page]);

  //페이지네이션 버튼을 누를시 실행해야 하는 것
  const afterPaginationClicked = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="reuse_partner_container">
        <div className="reuse_partner_title">업체목록</div>

        <div className="reuse_partner_search">
          <SearchContainer partnerNameChange={partnerNameChange} />
          {/* width, height 크기 조정시 값 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줘야함 */}
          <SearchButton width={100} height={50} />
        </div>

        <div className="reuse_partner_results">
          {loading ? (
            <p>로딩중...</p>
          ) : (
            <>
              <Table partners={partners} />
              <Pagination
                totalCount={partnerCount}
                page={page}
                afterPaginationClicked={afterPaginationClicked}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
