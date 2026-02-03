import { useState, useEffect } from "react";

import "./ReuseOperatorRequestPage.css";

import PercentBar from "../../../components/reuse-operator/request/list/percentbar/PercentBar";
import SearchContainer from "../../../components/reuse-operator/request/list/search/SearchContainer";
import SearchButton from "../../../components/reuse-operator/util/search-button/SearchButton";
import TabBar from "../../../components/reuse-operator/request/list/tabbar/TabBar";
import IsCompleteButton from "../../../components/reuse-operator/request/iscomplete-button/IsCompleteButton";
import Table from "../../../components/reuse-operator/request/list/table/Table";
import Pagination from "../../../components/pagination/Pagination";

import { TOTAL, COMPLETED, NOTCOMPLETED } from "../../../util/constant";
import {
  fetchTotalReuseRequests,
  fetchCompletedReuseRequests,
  fetchNotCompletedReuseRequests,
} from "../../../api/dummyReuseRequests";

export default function ReuseOperatorRequestPage() {
  //로그인한 수거지점장에게 온 전체 요청갯수
  const [totalRequestCount, setTotalRequestCount] = useState(0);
  //로그인한 수거지점장이 완료한 요청갯수
  const [completedRequestCount, setCompletedRequestCount] = useState(0);
  //조회기간 시작일자
  const [startDate, setStartDate] = useState("");
  //조회기간 종료일자
  const [endDate, setEndDate] = useState("");
  //제휴지점명
  const [partnerName, setPartnerName] = useState("");
  //선택한 탭바 내용 => 기본은 전체
  const [tabBarContent, setTabBarContent] = useState(TOTAL);
  //맨 처음 랜딩시에는 전체, 검색시에는 검색결과, 탭바 누를시 해당 필터링한 요청항목들
  const [requests, setRequests] = useState([]);
  //현재 필터링한 요청항목들에 대한 개수
  const [requestCount, setRequestCount] = useState(0);
  //fetch로 불러올동안 로딩중 여부
  const [loading, setLoading] = useState(true);
  //무슨 페이지를 눌렀는지
  const [page, setPage] = useState(1);

  const startDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const endDateChange = (startDate) => {
    setEndDate(startDate);
  };

  const partnerNameChange = (partnerName) => {
    setPartnerName(partnerName);
  };

  const tabBarClicked = (e) => {
    setLoading(true);

    switch (e.target.id) {
      case "tab_total":
        setTabBarContent(TOTAL);
        break;
      case "tab_completed":
        setTabBarContent(COMPLETED);
        break;
      case "tab_notcompleted":
        setTabBarContent(NOTCOMPLETED);
        break;
      default:
        console.log("tabbar clicked error");
    }
  };

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  useEffect(() => {
    //mount 되자마자
    //fetch로 전체, 완료 갯수를 불러오기
    //fetch로 전체 요청 목록 불러오기

    // const run = async () => {
    //   let reuseRequests = await fetchReuseRequests();
    //   setRequests(reuseRequests.requests);
    //   console.log(reuseRequests);
    // };

    // run();

    fetchTotalReuseRequests().then((data) => {
      setRequests(data.requests);
      //console.log(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    //console.log(startDate);
  }, [startDate]);

  useEffect(() => {
    //console.log(endDate);
  }, [endDate]);

  useEffect(() => {
    //console.log(partnerName);
  }, [partnerName]);

  useEffect(() => {
    //console.log(tabBarContent);
    switch (tabBarContent) {
      case TOTAL:
        fetchTotalReuseRequests().then((data) => {
          setRequests(data.requests);
          //console.log(data.requests);
          setRequestCount(data.searchRequestCount);
          setLoading(false);
        });
        break;
      case COMPLETED:
        fetchCompletedReuseRequests().then((data) => {
          setRequests(data.requests);
          //console.log(data.requests);
          setRequestCount(data.searchRequestCount);
          setLoading(false);
        });
        break;
      case NOTCOMPLETED:
        fetchNotCompletedReuseRequests().then((data) => {
          setRequests(data.requests);
          //console.log(data.requests);
          setRequestCount(data.searchRequestCount);
          setLoading(false);
        });
        break;
    }
  }, [tabBarContent]);

  //완료 버튼을 누를시 실행해야하는것
  const afterCompleted = (e) => {};

  //취소 버튼을 누를시 실행해야하는것
  const afterCanceled = (e) => {};

  //페이지네이션 버튼을 누를시 실행해야 하는 것
  const afterPaginationClicked = (page) => {
    setPage(page);
  };

  //페이지네이션 페이지가 변화할때마다, 검색결과를 할때마다
  useEffect(() => {
    //fetch로 불러와 usestate로 관리
  }, [requests, page]);

  return (
    <>
      <div className="reuse_request_container">
        <div className="reuse_request_title">수거 현황</div>
        <PercentBar totalRequest={1000} completedRequest={590} />
        <div className="reuse_request_search">
          <SearchContainer
            startDateChange={startDateChange}
            endDateChange={endDateChange}
            partnerNameChange={partnerNameChange}
          />
          {/* width, height 크기 조정시 값 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
          <SearchButton width={100} height={100} />
        </div>
        <TabBar tabBarContent={tabBarContent} tabBarClicked={tabBarClicked} />

        <div className="reuse_request_results">
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
        </div>
      </div>
    </>
  );
}
