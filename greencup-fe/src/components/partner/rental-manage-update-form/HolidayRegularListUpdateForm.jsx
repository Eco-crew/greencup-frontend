import { useState, useEffect } from "react";

import "./HolidayRegularListUpdateForm.css";

//업체지점장-대여관리-정기휴일
export default function HolidayRegularListUpdateForm({
  updateOffWeeklyOffDays,
  onChange,
}) {
  const [realWeeklyOffDays, setRealWeeklyOffDays] = useState({
    Mon: { text: "월요일", isHoliday: false },
    Tue: { text: "화요일", isHoliday: false },
    Wed: { text: "수요일", isHoliday: false },
    Thu: { text: "목요일", isHoliday: false },
    Fri: { text: "금요일", isHoliday: false },
    Sat: { text: "토요일", isHoliday: false },
    Sun: { text: "일요일", isHoliday: false },
  });
  useEffect(() => {
    //배열에 있으면 쉬는날 표시이다
    setRealWeeklyOffDays((prev) => {
      const next = { ...prev };

      Object.keys(next).forEach((day) => {
        next[day] = {
          ...next[day],
          isHoliday: updateOffWeeklyOffDays?.includes(day) ?? false,
        };
      });

      return next;
    });
  }, [updateOffWeeklyOffDays]);

  return (
    <>
      <div className="partner-rental-manage-regular-holiday-list-container">
        <div className="partner-rental-manage-regular-holiday-list">
          {updateOffWeeklyOffDays &&
            Object.keys(realWeeklyOffDays).map((day) => (
              <div
                key={day}
                className="partner-rental-manage-regular-holiday-element"
              >
                {realWeeklyOffDays[day].isHoliday == true ? (
                  <input
                    value={day}
                    className="partner-rental-manage-regular-holiday-checkbox"
                    type="checkbox"
                    checked={true}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                ) : (
                  <input
                    value={day}
                    className="partner-rental-manage-regular-holiday-checkbox"
                    type="checkbox"
                    checked={false}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                )}
                <div>{realWeeklyOffDays[day].text}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
