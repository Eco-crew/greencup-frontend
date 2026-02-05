import './CancelModal.css';

import CancelButton from '../../../util/cancel-button/CancelButton';
import ConfirmButton from '../../../util/confirm-button/ConfirmButton';

//하얀 모달 크기 외부에서 지정 => width, height
//확인, 취소버튼 누를시 실행할 함수는 외부에서 지정
export default function CancelModal ({width, height, confirmClick, cancelClick}) {
    const modalWhiteBackgroundStyle = () => ({
    width:width, height:height
  });
    return (
        <>
        <div
          className="cancelModalWhiteBackground"
          style={modalWhiteBackgroundStyle()}
        >
            <div className="cancelModalContentContainer">
                <div className="cancelModalContentText">정말 미완료로 변경하시겠습니까?</div>
                <div className="cancelModalButtonContainer">
                    <ConfirmButton width={120} height={50} onClick={confirmClick}/>
                    <CancelButton width={120} height={50} onClick={cancelClick}/>
                </div>
            </div>
        </div>
        </>
    )
}