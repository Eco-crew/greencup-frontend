//임시데이터
const partnerRequests = {
    requests: [
        { requestId: 'dfdsfs-134dfds0', needCount: 500, returnCount: 500, brokenLostCount: 10, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'requesting' },
        { requestId: 'dfdsfs-134dfds1', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'requesting' },
        { requestId: 'dfdsfs-134dfds2', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'requesting'},
        { requestId: 'dfdsfs-134dfds3', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'complete' },
        { requestId: 'dfdsfs-134dfds4', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'complete' },
        { requestId: 'dfdsfs-134dfds5', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'complete' },
        { requestId: 'dfdsfs-134dfds6', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'complete' },
        { requestId: 'dfdsfs-134dfds7', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'cancelled'},
        { requestId: 'dfdsfs-134dfds8', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'cancelled' },
        { requestId: 'dfdsfs-134dfds9', needCount: 100, returnCount: 100, brokenLostCount: 0, wantedVisitTime: '2025-01-17 08:00', requestedDate: '2025-01-17', status: 'cancelled'},
    ],
    searchRequestCount: 135,
}

//실제로 가져오는것처럼 보여주려고 일부러 딜레이를 추가
const API_DELAY_MS = 300;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTotalPartnerRequests() {
    await sleep(API_DELAY_MS);
    return partnerRequests;
}

export async function fetchRequestingPartnerRequests() {
    await sleep(API_DELAY_MS);
    let tmpPartnerRequests = { ...partnerRequests };
    tmpPartnerRequests.requests = partnerRequests.requests.filter((request) => request.status === 'requesting');
    return tmpPartnerRequests;
}

export async function fetchCompletedPartnerRequests() {
    await sleep(API_DELAY_MS);
    let tmpPartnerRequests = { ...partnerRequests };
    tmpPartnerRequests.requests = partnerRequests.requests.filter((request) => request.status === 'complete');
    return tmpPartnerRequests;
}

export async function fetchCancelledPartnerRequests() {
    await sleep(API_DELAY_MS);
    let tmpPartnerRequests = { ...partnerRequests };
    tmpPartnerRequests.requests = partnerRequests.requests.filter((request) => request.status === 'cancelled');
    return tmpPartnerRequests;
}
