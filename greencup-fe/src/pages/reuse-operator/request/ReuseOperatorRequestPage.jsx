import { useState, useEffect, useContext, useRef } from "react";

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
  CANCELLED,
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

  //로그인한 수거지점장에게 온 조회조건으로 검색한 전체 요청갯수
  const [totalRequestCount, setTotalRequestCount] = useState(0);
  //로그인한 수거지점장이 완료한 조회조건으로 검색한 요청갯수
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
  //첫 mount시에 fetch가 2번 호출되는것 막기
  const firstTabEffect = useRef(true);
  //useEffect 의존성 문제때문에 원래 1페이지인 상태에서 다른 탭 이동시 trigger유발
  const [reloadKey, setReloadKey] = useState(0);

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
      case "tab_cancelled":
        setTabBarContent(CANCELLED);
        break;
      default:
        console.log("tabbar clicked error");
    }
  };

  //전체목록 불러온후 상태관리하는 함수
  const handleFetchTotalReuseRequests = async (pageNum) => {
    // fetchTotalReuseRequests().then((data) => {
    //   setRequests(data.requests);
    //   setRequestCount(data.searchRequestCount);
    //   setLoading(false);
    // });

    const response = await fetch(
      `/api/reuse-operator/requests/total?startDate=${startDate}&endDate=${endDate}&partnerName=${encodeURIComponent(partnerName)}&page=${pageNum}&pageRowSize=${SHOW_POSTS_COUNT}`,
      {
        method: "GET",
        credentials: "include", // 세션에 관한 쿠키도 꼭 전송
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setRequests(data.requests);
      //console.log(data.requests);
      setRequestCount(data.searchRequestCount);
      setTotalRequestCount(data.searchRequestCount);
      setCompletedRequestCount(data.completeCount);
      setLoading(false);
    } else {
      console.log("수거지점장- 전체 요청현황 불러오기 오류");
    }
  };

  //완료된 목록만 불러온후 상태관리하는 함수
  const handleFetchCompletedReuseRequests = async (pageNum) => {
    // fetchCompletedReuseRequests().then((data) => {
    //   setRequests(data.requests);
    //   setRequestCount(data.searchRequestCount);
    //   setLoading(false);
    // });

    const response = await fetch(
      `/api/reuse-operator/requests/completed?startDate=${startDate}&endDate=${endDate}&partnerName=${encodeURIComponent(partnerName)}&page=${pageNum}&pageRowSize=${SHOW_POSTS_COUNT}`,
      {
        method: "GET",
        credentials: "include", // 세션에 관한 쿠키도 꼭 전송
      },
    );

    if (response.ok) {
      const data = await response.json();
      setRequests(data.requests);
      //console.log(data.requests);
      setRequestCount(data.searchRequestCount);
      setTotalRequestCount(data.searchRequestCount);
      setCompletedRequestCount(data.completeCount);
      setLoading(false);
    } else {
      console.log("수거지점장- 완료된 요청현황 불러오기 오류");
    }
  };

  //미완료된 목록만 불러온후 상태관리하는 함수
  const handleFetchNotCompletedReuseRequests = async (pageNum) => {
    // fetchNotCompletedReuseRequests().then((data) => {
    //   setRequests(data.requests);
    //   setRequestCount(data.searchRequestCount);
    //   setLoading(false);
    // });

    const response = await fetch(
      `/api/reuse-operator/requests/notcompleted?startDate=${startDate}&endDate=${endDate}&partnerName=${encodeURIComponent(partnerName)}&page=${pageNum}&pageRowSize=${SHOW_POSTS_COUNT}`,
      {
        method: "GET",
        credentials: "include", // 세션에 관한 쿠키도 꼭 전송
      },
    );

    if (response.ok) {
      const data = await response.json();
      setRequests(data.requests);
      //console.log(data.requests);
      setRequestCount(data.searchRequestCount);
      setTotalRequestCount(data.searchRequestCount);
      setCompletedRequestCount(data.completeCount);
      setLoading(false);
    } else {
      console.log("수거지점장- 미완료된 요청현황 불러오기 오류");
    }
  };

  //취소된 목록만 불러온후 상태관리하는 함수
  const handleFetchCancelledReuseRequests = async (pageNum) => {
    const response = await fetch(
      `/api/reuse-operator/requests/cancelled?startDate=${startDate}&endDate=${endDate}&partnerName=${encodeURIComponent(partnerName)}&page=${pageNum}&pageRowSize=${SHOW_POSTS_COUNT}`,
      {
        method: "GET",
        credentials: "include", // 세션에 관한 쿠키도 꼭 전송
      },
    );

    if (response.ok) {
      const data = await response.json();
      setRequests(data.requests);
      //console.log(data.requests);
      setRequestCount(data.searchRequestCount);
      setTotalRequestCount(data.searchRequestCount);
      setCompletedRequestCount(data.completeCount);
      setLoading(false);
    } else {
      console.log("수거지점장- 취소된 요청현황 불러오기 오류");
    }
  };

  //탭바에 따라 목록 불러오는 함수
  const fetchListWithTabbarContent = (tabBarContent, pageNum) => {
    switch (tabBarContent) {
      case TOTAL:
        handleFetchTotalReuseRequests(pageNum);
        break;
      case COMPLETED:
        handleFetchCompletedReuseRequests(pageNum);
        break;
      case NOTCOMPLETED:
        handleFetchNotCompletedReuseRequests(pageNum);
        break;
      case CANCELLED:
        handleFetchCancelledReuseRequests(pageNum);
        break;
    }
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
  //페이지네이션 페이지가 변화할때마다, 요청현황이 완료혹은 취소로 바뀔때마다도
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 전체, 완료 갯수를 불러오기
    //fetch로 전체 요청 목록 불러오기
    //console.log(tabBarContent);

    setLoading(true);
    fetchListWithTabbarContent(tabBarContent, page);
  }, [page, reloadKey, reuseCancelReloadKey, reuseCompleteReloadKey]);

  //탭 내용을 바꿀시에는 무조건 1페이지로 초기화하고 fetch로 해당목록 불러오기
  useEffect(() => {
    //첫 마운트는 여기서 중단
    if (firstTabEffect.current) {
      firstTabEffect.current = false;
      return;
    }

    //이전탭에서도 1페이지였어도 트리거를 발생시키기 위해
    if (page === 1) setReloadKey((k) => k + 1);
    else setPage(1);

  }, [tabBarContent]);

  //조회버튼을 누를 시 실행해야 하는 것
  const afterSearchClicked = () => {
    //조회를 누르기전 1페이지였어도 트리거를 발생시키기 위해
    if (page === 1) setReloadKey((k) => k + 1);
    else setPage(1);
  };

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
        <div className="reuse_request_percent">
          <PercentBar
            totalRequest={totalRequestCount}
            completedRequest={completedRequestCount}
          />
        </div>

        {/* <PercentBar totalRequest={1000} completedRequest={590} /> */}
        <div className="reuse_request_search">
          <SearchContainer
            startDateChange={startDateChange}
            endDateChange={endDateChange}
            startDate={startDate}
            endDate={endDate}
            partnerNameChange={partnerNameChange}
          />
          {/* width, height 크기 조정시 값 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
          <SearchButton width={100} height={100} onClick={afterSearchClicked} />
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
