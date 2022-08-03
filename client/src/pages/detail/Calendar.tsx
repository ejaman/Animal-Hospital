import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { reservationState } from '../../state/ReservationState';
import CalendarContainer from './CalendarStyle';

export const CalendarTitle = styled.span`
  margin-left: 12px;
  font-size: 21px;
`;
const d = new Date();
const year = d.getFullYear(); // 년
const month = d.getMonth(); // 월
const day = d.getDate(); // 일

const CalenderUi = () => {
  const [value, setValue] = useState(new Date()); // 사용 이유..?
  const [date, setDate] = useRecoilState(reservationState);

  // 날짜를 클릭하면 바뀌는 함수 ( 날짜를 클릭할때마다 아래의 시간 컴포넌트를 새로 불러와서 상태를 관리한다. )
  const onDateChange = (e: any) => {
    const getDate = `${e.getFullYear()}년 ${
      e.getMonth() + 1
    }월 ${e.getDate()}일`;
    console.log(getDate);

    setDate({
      ...date,
      rezDate: getDate,
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faCalendarDays} />
        <CalendarTitle>예약</CalendarTitle>
      </div>
      <CalendarContainer>
        <Calendar
          onChange={setValue}
          formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          minDate={new Date()} // 오늘 날짜부터 선택할 수 있도록
          maxDate={new Date(year, month + 2, day)} // 두 달 이후엔 예약할 수 없도록
          onClickDay={onDateChange}
        />
      </CalendarContainer>
    </div>
  );
};

export default CalenderUi;
