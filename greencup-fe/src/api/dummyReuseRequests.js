//임시데이터
const reuseRequests = {
    requests: [
        { requestId: 'sdfssfsf-dfdfdsf', needCount: 500, returnCount: 500, brokenLostCount: 10, partnerName: '공유오피스A', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: true },
        { requestId: 'dfdsfs-134dfds', needCount: 100, returnCount:100, brokenLostCount:0,  partnerName:'공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed : false } , 
    ],
    searchRequestCount: 2,
}

//실제로 가져오는것처럼 보여주려고 일부러 딜레이를 추가
const API_DELAY_MS = 300;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));

}

export async function fetchReuseRequests() {
    await sleep(API_DELAY_MS);

    return reuseRequests;
}
