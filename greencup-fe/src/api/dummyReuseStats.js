//수거지점장-통계
const reuseStats = {
    currentTotal: {
        currentTotalCount: 10000,
        currentTotalLoanCount: 6000,
        currentHaveCount: 3500,
        totalBrokenLostCount: 500,
    },

    periodTotal: {
        periodTotalLoanCount: 6000,
        periodTotalReturnCount: 3500,
        periodTotalBrokenLostCount: 200,
    },

    periodTotalLoanTypes: [
        { periodTotalLoanTypeName: 'office', periodTotalLoanTypePercent: 30 },
        { periodTotalLoanTypeName: 'public', periodTotalLoanTypePercent: 40 },
        { periodTotalLoanTypeName: 'event', periodTotalLoanTypePercent: 10 },
        { periodTotalLoanTypeName: 'cafe', periodTotalLoanTypePercent: 20 },
        
    ]
}


//실제로 가져오는것처럼 보여주려고 일부러 딜레이를 추가
const API_DELAY_MS = 300;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchReuseStats() {
    await sleep(API_DELAY_MS);
    return reuseStats;
}
