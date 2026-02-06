import { useState } from "react";

import "./ReuseOperatorPartnerManagePage.css";


import SearchContainer from "../../../components/reuse-operator/partner-manage/list/search/SearchContainer";
import SearchButton from "../../../components/reuse-operator/util/search-button/SearchButton";

//수거지점장-업체관리-업체목록
export default function ReuseOperatorPartnerManagePage() {
  //제휴지점명
  const [partnerName, setPartnerName] = useState("");

  //input박스에 입력시 마다 실행할 함수
  const partnerNameChange = (partnerName) => {
    setPartnerName(partnerName);
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

        {/* <div className="reuse_request_results">
                  {loading ? (
                    <p>로딩중...</p>
                  ) : (
                    <>
                      <Table
                        requests={requests}
                        afterCompleted={afterCompleted}
                        afterCanceled={afterCanceled}
                      />{" "}
                      <Pagination
                        totalCount={requestCount}
                        page={page}
                        afterPaginationClicked={afterPaginationClicked}
                      />
                    </>
                  )}
            </div> */}
      </div>
    </>
  );
}
