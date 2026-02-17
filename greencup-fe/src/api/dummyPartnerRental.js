const partnerRentalInfo = {
    partner: {
        partnerName: '공유오피스A',
        partnerManagerName: '공유오피스A사장김씨',
        totalLoanCount: 1000,
        totalReturnCount: 890,
        totalBrokenLostCount: 10,
    },

    reuse: {
        reuseOperatorName: '수거지점A',
        reuseOperatorManagerName: '수거지점장A김씨',
        reuseOperatorManagerPhone: '010-0000-0000',
    },

    settingInfo: {
        defaultNeedCount: 100,
        defaultReturnCount: 100,
        defaultVisitTime:  '08:00',
        memo: '도착전 연락부탁드립니다.',
    },

    weeklyOffDays: [
        'Sat', 'Sun'
    ],

    offDates: [
        '2026-01-24', '2026-01-25'
    ]
}
//실제로 가져오는것처럼 보여주려고 일부러 딜레이를 추가
const API_DELAY_MS = 300;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchPartnerRental() {
    await sleep(API_DELAY_MS);
    return partnerRentalInfo;
}
