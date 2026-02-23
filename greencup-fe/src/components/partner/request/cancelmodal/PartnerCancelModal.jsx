import "./PartnerCancelModal.css";

import CancelButton from "../../util/cancel-button/CancelButton";
import ConfirmButton from "../../util/confirm-button/ConfirmButton";

//하얀 모달 크기 외부에서 지정 => width, height
//확인, 취소버튼 누를시 실행할 함수는 외부에서 지정
//업체지점장-대여요청 취소 모달
export default function PartnerCancelModal({
  width,
  height,
  confirmClick,
  cancelClick,
}) {
  const modalWhiteBackgroundStyle = () => ({
    width: width,
    height: height,
  });
  return (
    <>
      <div
        className="partnerCancelModalWhiteBackground"
        style={modalWhiteBackgroundStyle()}
      >
        <div className="partnerCancelModalContentContainer">
          <div className="partnerCancelModalContentText">
            <span>대여 요청을 취소하면 다시 등록할 수 없습니다.</span>
            <span>진행하시겠습니까?</span>
          </div>
          <div className="partnerCancelModalButtonContainer">
            <ConfirmButton width={120} height={50} onClick={confirmClick} />
            <CancelButton width={120} height={50} onClick={cancelClick} />
          </div>
        </div>
      </div>
    </>
  );
}
