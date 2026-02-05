//임시데이터
const reuseRequests = {
    requests: [
        { requestId: 'sdfssfsf-dfdfdsf0', needCount: 500, returnCount: 500, brokenLostCount: 10, partnerName: '공유오피스A', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: true },
        { requestId: 'dfdsfs-134dfds1', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds2', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds3', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds4', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds5', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds6', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds7', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds8', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
        { requestId: 'dfdsfs-134dfds9', needCount: 100, returnCount: 100, brokenLostCount: 0, partnerName: '공유오피스B', wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', completed: false },
    ],
    searchRequestCount: 135,
}

//실제로 가져오는것처럼 보여주려고 일부러 딜레이를 추가
const API_DELAY_MS = 300;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTotalReuseRequests() {
    await sleep(API_DELAY_MS);
    return reuseRequests;
}

export async function fetchCompletedReuseRequests() {
    await sleep(API_DELAY_MS);
    let tmpReuseRequests = {...reuseRequests};
    tmpReuseRequests.requests = reuseRequests.requests.filter((request) => request.completed === true);
    return tmpReuseRequests;
}

export async function fetchNotCompletedReuseRequests() {
    await sleep(API_DELAY_MS);
    let tmpReuseRequests = {...reuseRequests};
    tmpReuseRequests.requests = reuseRequests.requests.filter((request) => request.completed === false);
    return tmpReuseRequests;
}

export async function fetchDetailReuseRequest(requestId) {
    await sleep(API_DELAY_MS);
    let tmpReuseRequests = {...reuseRequests};
    tmpReuseRequests.requests = reuseRequests.requests.filter((request) => request.requestId === requestId);
    return tmpReuseRequests;
}