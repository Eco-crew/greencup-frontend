import { fetchReturnedCountReuseRequest } from "../api/dummyReuseRequests";

//01012345678처럼 번호에 -이 없으므로 - 추가하여 화면 렌더링
export const makePhoneNumberHyphen = (phoneNumber) => {
    let splitedPhoneNumber = phoneNumber.split('');
    let hyphenString = '';

    //010- 핸드폰 번호일때
    if (phoneNumber.slice(0, 3) === '010') {
        splitedPhoneNumber.forEach((value, index) => {
            //010-1234-5678
            switch (index) {
                case 2:
                case 6:
                    hyphenString += value + '-';
                    break;
                default:
                    hyphenString += value;
                    break;
            }
        });
    } else {
        splitedPhoneNumber.forEach((value, index) => {
            //02-1234-5678
            switch (index) {
                case 1:
                case 5:
                    hyphenString += value + '-';
                    break;
                default:
                    hyphenString += value;
                    break;
            }
        });
    }


    return hyphenString;
}

//오늘날 현재 날짜를 yyyy-mm-dd 문자열로 만들기
export const makeTodayString = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

}

//오늘날 현재 날짜에서 -7일전 날짜를 yyyy-mm-dd 문자열로 만들기
export const make7DaysAgoString = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 7);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
}

//두개의 날짜 범위로 조회시, 앞박스 날짜가 뒷박스날짜보다 큰경우, 순서를 바꿔서 배치
export const checkDatesRanges = (startDateStr, endDateStr) => {
    let startDate = new Date(startDateStr);
    let endDate = new Date(endDateStr);
    if (startDate > endDate) {
        return { changed: true, startDate: endDateStr, endDate: startDateStr };
    } else {
        return { changed: false };
    }
}

//파손및 분실 개수 유효성 검증
//요청현황아이디를 가지고 반납개수를 불러온다
//그리고 나서 -음수이거나 반납개수 이하인지 확인한다
//일단 음수만 체크하기로 협의
export const checkMissedCount = async (missedCount) => {
    //let returnedCount = await fetchReturnedCountReuseRequest(requestId);
    //console.log(missedCount);
    //console.log(returnedCount);

    if (missedCount < 0) {
        return false;
    }
    return true;
}

//입력한 문자열이 HH:MM 형식인지 검사
export const isValidTime = (str) => {
    //[01]\d => 첫 번째 자리가 0 또는 1, 두 번째 자리가 숫자(0~9)
    //2[0-3] => 첫 번째 자리가 무조건 2, 두 번째 자리가 0~3
    //[0-5]\d => 첫 번째 자리가 0~5, 두 번째 자리가 0~9
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(str);
}