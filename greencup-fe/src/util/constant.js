//현재 로그인한 사용자의 역할
export const REUSE_OPERATOR = "reuseOperator";
export const PARTNER = "partner";

//현재 수거지점장-요청현황에서 무슨 탭바를 눌렀는지
export const TOTAL = "total";
export const COMPLETED = "completed";
export const NOTCOMPLETED = "notCompleted";
export const CANCELLED = "cancelled";

//수거지점장-요청현황-백엔드에서 받은 헤더 키
export const REQUEST_ID = "requestId";
export const NEED_COUNT = "needCount";
export const RETURN_COUNT = "returnCount";
export const BROKEN_LOST_COUNT = "brokenLostCount";
export const PARTNER_NAME = "partnerName";
export const WANTED_VISIT_TIME = "wantedVisitTime";
export const REQUESTED_DATE = "requestedDate";
export const REQUESTED_STATUS = "status";

//수거지점장-요청현황-완료
export const REQUEST_COMPLETED = "complete";
//수거지점장-요청현황-미완료
export const REQUEST_INCOMPLETED = "incomplete";
//수거지점장-요청현황-취소
export const REQUEST_CANCELLED = "cancelled";

//수거지점장-요청현황-한 페이지에 보여줄 버튼 갯수
//수거지점장-업체관리-한 페이지에 보여줄 버튼 갯수
//업체지점장-대여관리-한 페이지에 보여줄 버튼 갯수
export const BUTTON_BLOCK_SIZE = 10;
//수거지점장-요청현황-한 페이지에 보여줄 게시물 갯수
//수거지점장-업체관리-한 페이지에 보여줄 게시물 갯수
//업체지점장-대여관리-한 페이지에 보여줄 게시물 갯수
export const SHOW_POSTS_COUNT = 10;

//수거지점장-업체관리-백엔드에서 받은 헤더 키
export const PARTNER_ID = "partnerId";
//위와 겹침
//export const PARTNER_NAME = "partnerName";
export const PARTNER_MANAGER_NAME = "partnerManagerName";
export const CURRENT_LOAN_COUNT = "currentLoanCount";

//수거지점장-업체관리-비정기휴무일 한 페이지에서 보여줄 휴무일 갯수
export const SHOW_OFF_DATES_SIZE = 7;

//수거지점장-업체관리-백엔드에서 받은 헤더 키
export const PERIOD_TOTAL_LOAN_TYPE_NAME = "periodTotalLoanTypeName";
export const PERIOD_TOTAL_LOAN_TYPE_NAME_OFFICE = "office";
export const PERIOD_TOTAL_LOAN_TYPE_NAME_PUBLIC = "public";
export const PERIOD_TOTAL_LOAN_TYPE_NAME_EVENT = "event";
export const PERIOD_TOTAL_LOAN_TYPE_NAME_CAFE = "cafe";

//업체지점장- 대여기록에서 무슨 탭바를 눌렀는지
//위와 겹침
//export const TOTAL = "total";
export const REQUESTING = "requesting";
//export const COMPLETED = "completed";
//export const CANCELLED = "cancelled";


//업체지점장-대여기록-백엔드에서 받은 헤더 키
//위와 겹침
//export const REQUEST_ID = "requestId";
//export const NEED_COUNT = "needCount";
//export const RETURN_COUNT = "returnCount";
//export const BROKEN_LOST_COUNT = "brokenLostCount";
//export const WANTED_VISIT_TIME = "wantedVisitTime";
//export const REQUESTED_DATE = "requestedDate";
//export const REQUESTED_STATUS = "status";

//업체지점장-대여기록-요청중
export const REQUEST_REQUESTING = "requesting";
//업체지점장-대여기록-완료
//export const REQUEST_COMPLETED = "complete";
//업체지점장-대여기록-취소
//export const REQUEST_CANCELLED = "cancelled";