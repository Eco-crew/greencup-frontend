//실제로 가져오는것처럼 보여주려고 일부러 딜레이를 추가
const API_DELAY_MS = 300;

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));

}

export async function loginUser(){
    await sleep(API_DELAY_MS);
}
