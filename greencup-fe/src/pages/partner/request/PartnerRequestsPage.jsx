import { useState, useEffect, useContext } from "react";

import "./PartnerRequestsPage.css";

import SearchContainer from "../../../components/partner/request/search/SearchContainer";
import SearchButton from "../../../components/partner/util/search-button/SearchButton";
import TabBar from "../../../components/partner/request/tabbar/TabBar";
import Table from "../../../components/partner/request/table/Table";
import Pagination from "../../../components/pagination/Pagination";

import { partnerContext } from "../../../App";

import {
  TOTAL,
  REQUESTING,
  COMPLETED,
  CANCELLED,
} from "../../../util/constant";
import {
  fetchTotalPartnerRequests,
  fetchRequestingPartnerRequests,
  fetchCompletedPartnerRequests,
  fetchCancelledPartnerRequests,
} from "../../../api/dummyPartnerRequests";
import {
  makeTodayString,
  make7DaysAgoString,
  checkDatesRanges,
} from "../../../util/utilFunction";

//업체지점장- 대여기록
export default function PartnerRequestsPage() {
  //업체지점장- 대여기록에서 취소버튼을 누를시 함수를 가져옴
  const { partnerCancelReloadKey, partnerRequestCancelClick } =
    useContext(partnerContext);
  //<input type="date"> 는 Date 객체가 아니라 문자열 "yyyy-mm-dd" 형태로 값을 다룸
  //조회기간 시작일자 => 디폴트 오늘날짜 - 7
  const todayString = makeTodayString();
  const days7AgoString = make7DaysAgoString(todayString);
  const [startDate, setStartDate] = useState(days7AgoString);
  //조회기간 종료일자 => 디폴트 오늘날짜
  const [endDate, setEndDate] = useState(todayString);

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

  const tabBarClicked = (e) => {
    switch (e.target.id) {
      case "partner_request_tab_total":
        setTabBarContent(TOTAL);
        break;
      case "partner_request_tab_requesting":
        setTabBarContent(REQUESTING);
        break;
      case "partner_request_tab_completed":
        setTabBarContent(COMPLETED);
        break;
      case "partner_request_tab_cancelled":
        setTabBarContent(CANCELLED);
        break;
      default:
        console.log("tabbar clicked error");
    }
  };

  //전체목록 불러온후 상태관리하는 함수
  const handleFetchTotalPartnerRequests = async () => {
    fetchTotalPartnerRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });
  };

  //요청중인 목록만 불러온후 상태관리하는 함수
  const handleFetchRequestingPartnerRequests = async () => {
    fetchRequestingPartnerRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });
  };

  //완료된 목록만 불러온후 상태관리하는 함수
  const handleFetchCompletedPartnerRequests = async () => {
    fetchCompletedPartnerRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });
  };

  //취소된 목록만 불러온후 상태관리하는 함수
  const handleFetchCancelledPartnerRequests = async () => {
    fetchCancelledPartnerRequests().then((data) => {
      setRequests(data.requests);
      setRequestCount(data.searchRequestCount);
      setLoading(false);
    });
  };

  //탭바에 따라 목록 불러오는 함수
  const fetchListWithTabbarContent = (tabBarContent) => {
    switch (tabBarContent) {
      case TOTAL:
        handleFetchTotalPartnerRequests();
        break;
      case REQUESTING:
        handleFetchRequestingPartnerRequests();
        break;
      case COMPLETED:
        handleFetchCompletedPartnerRequests();
        break;
      case CANCELLED:
        handleFetchCancelledPartnerRequests();
        break;
    }
  };

  useEffect(() => {
    //console.log(startDate);
  }, [startDate]);

  useEffect(() => {
    //console.log(endDate);
  }, [endDate]);

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  //페이지네이션 페이지가 변화할때마다, 요청현황이 완료혹은 취소로 바뀔때마다도
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 전체, 완료 갯수를 불러오기
    //fetch로 전체 요청 목록 불러오기
    //console.log(tabBarContent);

    setLoading(true);
    fetchListWithTabbarContent(tabBarContent);
  }, [page, partnerCancelReloadKey]);

  //탭 내용을 바꿀시에는 무조건 1페이지로 초기화하고 fetch로 해당목록 불러오기
  useEffect(() => {
    setPage(1);
    setLoading(true);
    fetchListWithTabbarContent(tabBarContent);
  }, [tabBarContent]);

  //조회버튼을 누를 시 실행해야 하는 것
  const afterSearchClicked = () => {
    setLoading(true);
    fetchListWithTabbarContent(tabBarContent);
  };

  //table 칸에 있는 취소 버튼을 누를시 실행해야하는것
  const afterCanceled = (e) => {
    //console.log(e.currentTarget.dataset.id);
    partnerRequestCancelClick(e.currentTarget.dataset.id);
  };

  //페이지네이션 버튼을 누를시 실행해야 하는 것
  const afterPaginationClicked = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="partner_request_container">
        <div className="partner_request_title">대여 기록</div>
        <div className="partner_request_search">
          <SearchContainer
            startDateChange={startDateChange}
            endDateChange={endDateChange}
            startDate={startDate}
            endDate={endDate}
          />
          {/* width, height 크기 조정시 값 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
          <SearchButton width={100} height={100} onClick={afterSearchClicked} />
        </div>
        <TabBar tabBarContent={tabBarContent} tabBarClicked={tabBarClicked} />

        <div className="partner_request_results">
          {loading ? (
            <p>로딩중...</p>
          ) : (
            <>
              <Table requests={requests} afterCanceled={afterCanceled} />
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
