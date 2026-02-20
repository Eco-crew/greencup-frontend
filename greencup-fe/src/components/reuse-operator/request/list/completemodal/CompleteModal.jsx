import "./CompleteModal.css";

import CancelButton from "../../../util/cancel-button/CancelButton";
import ConfirmButton from "../../../util/confirm-button/ConfirmButton";

//하얀 모달 크기 외부에서 지정 => width, height
//확인, 취소버튼 누를시 실행할 함수는 외부에서 지정
//입력박스 내용 변경시 실행할 함수도 외부에서 지정
export default function CompleteModal({
  width,
  height,
  confirmClick,
  cancelClick,
  inputChange,
  reuseCompleteMissedCountValid,
}) {
  const modalWhiteBackgroundStyle = () => ({
    width: width,
    height: height,
  });
  return (
    <>
      <div
        className="completeModalWhiteBackground"
        style={modalWhiteBackgroundStyle()}
      >
        <div className="completeModalContentContainer">
          <div className="completeModalContentText">
            파손 및 분실 개수를 입력해주세요
          </div>
          <input
            className="completeModalInputNumber"
            type="number"
            defaultValue={0}
            onChange={(e) => {
              inputChange(e.target.value);
            }}
          />
          <div className="completeModalInputText">
            0이상을 입력해주세요.
          </div>
          {reuseCompleteMissedCountValid ? (
            ""
          ) : (
            <div className="completeModalInputErrorText">
              유효한 개수가 아닙니다.
            </div>
          )}
          <div className="completeModalButtonContainer">
            <ConfirmButton
              width={120}
              height={50}
              onClick={(e) => {
                confirmClick();
              }}
            />
            <CancelButton width={120} height={50} onClick={cancelClick} />
          </div>
        </div>
      </div>
    </>
  );
}
