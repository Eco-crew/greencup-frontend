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

export const makeTodayString = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

}

export const make7DaysAgoString = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 7);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
}
