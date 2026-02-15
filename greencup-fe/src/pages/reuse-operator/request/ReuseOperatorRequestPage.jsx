import { useState, useEffect, useContext } from "react";

import "./ReuseOperatorRequestPage.css";

import PercentBar from "../../../components/reuse-operator/request/list/percentbar/PercentBar";
import SearchContainer from "../../../components/reuse-operator/request/list/search/SearchContainer";
import SearchButton from "../../../components/reuse-operator/util/search-button/SearchButton";
import TabBar from "../../../components/reuse-operator/request/list/tabbar/TabBar";
import IsCompleteButton from "../../../components/reuse-operator/request/iscomplete-button/IsCompleteButton";
import Table from "../../../components/reuse-operator/request/list/table/Table";
import Pagination from "../../../components/pagination/Pagination";

import {
  TOTAL,
  COMPLETED,
  NOTCOMPLETED,
  SHOW_POSTS_COUNT,
} from "../../../util/constant";
import {
  fetchTotalReuseRequests,
  fetchCompletedReuseRequests,
  fetchNotCompletedReuseRequests,
} from "../../../api/dummyReuseRequests";
import { reuseContext } from "../../../App";
import {
  makeTodayString,
  make7DaysAgoString,
  checkDatesRanges,
} from "../../../util/utilFunction";

export default function ReuseOperatorRequestPage() {
  //수거지점장-요청현황에서 취소버튼 혹은 완료버튼 누를시 함수를 가져옴
  const {
    reuseRequestCancelClick,
    reuseCancelReloadKey,
    reuseRequestCompleteClick,
    reuseCompleteReloadKey,
  } = useContext(reuseContext);

  //로그인한 수거지점장에게 온 전체 요청갯수
  const [totalRequestCount, setTotalRequestCount] = useState(0);
  //로그인한 수거지점장이 완료한 요청갯수
  const [completedRequestCount, setCompletedRequestCount] = useState(0);

  //<input type="date"> 는 Date 객체가 아니라 문자열 "yyyy-mm-dd" 형태로 값을 다룸
  //조회기간 시작일자 => 디폴트 오늘날짜 - 7
  const todayString = makeTodayString();
  const days7AgoString = make7DaysAgoString(todayString);
  const [startDate, setStartDate] = useState(days7AgoString);
  //조회기간 종료일자 => 디폴트 오늘날짜
  const [endDate, setEndDate] = useState(todayString);

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
    let result = checkDatesRanges(startDate, endDate);

    if (result.changed) {
      setStartDate(result.startDate);
      setEndDate(result.endDate);
    } else {
      setStartDate(startDate);
    }
  };

  const endDateChange = (endDate) => {
    let result = checkDatesRanges(startDate, endDate);

    if (result.changed) {
      setStartDate(result.startDate);
      setEndDate(result.endDate);
    } else {
      setEndDate(endDate);
    }
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

  //전체목록 불러온후 상태관리하는 함수
  const handleFetchTotalReuseRequests = async () => {
    fetchTotalReuseRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });

    // const response = await fetch(
    //   `/api/reuse-operator/requests/total?startDate=${startDate}&endDate=${endDate}&page=${page}&pageRowSize=${SHOW_POSTS_COUNT}`,
    //   {
    //     method: "GET",
    //     credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    //   },
    // );

    // if (response.ok) {
    //   const data = await response.json();
    //   setRequests(data.requests);
    //   //console.log(data.requests);
    //   setRequestCount(data.searchRequestCount);
    //   setTotalRequestCount(data.totalRequestCount);
    //   setCompletedRequestCount(data.totalCompletedCount);
    //   setLoading(false);
    // } else {
    //   console.log("수거지점장- 전체 요청현황 불러오기 오류");
    // }

  };

  //완료된 목록만 불러온후 상태관리하는 함수
  const handleFetchCompletedReuseRequests = async () => {
    fetchCompletedReuseRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });  

    // const response = await fetch(
    //   `/api/reuse-operator/requests/completed?startDate=${startDate}&endDate=${endDate}&page=${page}&pageRowSize=${SHOW_POSTS_COUNT}`,
    //   {
    //     method: "GET",
    //     credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    //   },
    // );

    // if (response.ok) {
    //   const data = await response.json();
    //   setRequests(data.requests);
    //   //console.log(data.requests);
    //   setRequestCount(data.searchRequestCount);
    //   setTotalRequestCount(data.totalRequestCount);
    //   setCompletedRequestCount(data.totalCompletedCount);
    //   setLoading(false);
    // } else {
    //   console.log("수거지점장- 완료된 요청현황 불러오기 오류");
    // }
    
  };

  //미완료된 목록만 불러온후 상태관리하는 함수
  const handleFetchNotCompletedReuseRequests = async () => {
    fetchNotCompletedReuseRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });  

    // const response = await fetch(
    //   `/api/reuse-operator/requests/notcompleted?startDate=${startDate}&endDate=${endDate}&page=${page}&pageRowSize=${SHOW_POSTS_COUNT}`,
    //   {
    //     method: "GET",
    //     credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    //   },
    // );

    // if (response.ok) {
    //   const data = await response.json();
    //   setRequests(data.requests);
    //   //console.log(data.requests);
    //   setRequestCount(data.searchRequestCount);
    //   setTotalRequestCount(data.totalRequestCount);
    //   setCompletedRequestCount(data.totalCompletedCount);
    //   setLoading(false);
    // } else {
    //   console.log("수거지점장- 미완료된 요청현황 불러오기 오류");
    // }
  };

  useEffect(() => {
    //console.log(startDate);
  }, [startDate]);

  useEffect(() => {
    //console.log(endDate);
  }, [endDate]);

  useEffect(() => {
    //console.log(partnerName);
  }, [partnerName]);

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  //페이지네이션 페이지가 변화할때마다, 검색결과를 할때마다도
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 전체, 완료 갯수를 불러오기
    //fetch로 전체 요청 목록 불러오기

    //console.log(tabBarContent);

    switch (tabBarContent) {
      case TOTAL:
        handleFetchTotalReuseRequests();
        break;
      case COMPLETED:
        handleFetchCompletedReuseRequests();
        break;
      case NOTCOMPLETED:
        handleFetchNotCompletedReuseRequests();
        break;
    }
  }, [tabBarContent, page, reuseCancelReloadKey, reuseCompleteReloadKey]);

  //table칸에 있는 완료 버튼을 누를시 실행해야하는것
  const afterCompleted = (e) => {
    //console.log(e.currentTarget.dataset.id);
    reuseRequestCompleteClick(e.currentTarget.dataset.id);
  };

  //table 칸에 있는 취소 버튼을 누를시 실행해야하는것
  const afterCanceled = (e) => {
    //console.log(e.currentTarget.dataset.id);
    reuseRequestCancelClick(e.currentTarget.dataset.id);
  };

  //페이지네이션 버튼을 누를시 실행해야 하는 것
  const afterPaginationClicked = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="reuse_request_container">
        <div className="reuse_request_title">수거 현황</div>
        {/* <PercentBar
          totalRequest={totalRequestCount}
          completedRequest={completedRequestCount}
        /> */}
        <PercentBar totalRequest={1000} completedRequest={590} />
        <div className="reuse_request_search">
          <SearchContainer
            startDateChange={startDateChange}
            endDateChange={endDateChange}
            startDate={startDate}
            endDate={endDate}
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
              />
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
