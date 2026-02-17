import { useState, useEffect } from "react";

import "./HolidayRegularList.css";

export default function HolidayRegularList({ weeklyOffDays }) {
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

      weeklyOffDays.forEach((day) => {
        if (next[day]) {
          next[day] = { ...next[day], isHoliday: true };
        }
      });

      return next;
    });
  }, [weeklyOffDays]);

  return (
    <>
      <div className="partner-rental-manage-regular-holiday-list-container">
        <div className="partner-rental-manage-regular-holiday-list">
          {weeklyOffDays &&
            Object.keys(realWeeklyOffDays).map((day) => (
              <div
                key={day}
                className="partner-rental-manage-regular-holiday-element"
              >
                {realWeeklyOffDays[day].isHoliday == true ? (
                  <input className="partner-rental-manage-regular-holiday-checkbox" type="checkbox" checked={true} readOnly />
                ) : (
                  <input className="partner-rental-manage-regular-holiday-checkbox" type="checkbox" checked={false} readOnly/>
                )}
                <div>{realWeeklyOffDays[day].text}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
