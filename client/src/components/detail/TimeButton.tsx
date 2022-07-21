import React from "react";
import styled from "styled-components";
import { CalendarTitle } from "../../pages/detail/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";

const TimeWrapper = styled.div`
  margin-top: 20px;
`;

const TimeContainer = styled.button`
  width: 55px;
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  margin: 0 5px 5px;
  border: none;
  border: 1px solid #c8e1af;
  background-color: #edfbdc;
  cursor: pointer;
  &:hover {
    background-color: #edfbdc;
    color: #c8e1af;
  }
  &:focus {
    background-color: #00c73c;
    color: white;
  }
`;

const TimeTitle = styled(CalendarTitle)``;

const TimeButtonWrapper = styled.div`
  border: 1px solid #a0a096;
  padding: 10px;
`;

type TTimeProps = {
  time: number[];
};

const TimeButton = ({ time }: TTimeProps) => {
  const timeButtonItems = time.map((item, index) => (
    <TimeContainer key={index}>{item}:00</TimeContainer>
  ));

  return (
    <TimeWrapper>
      <div style={{ marginBottom: "20px" }}>
        <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faClockFour} />
        <TimeTitle>시간</TimeTitle>
      </div>
      <TimeButtonWrapper>{timeButtonItems}</TimeButtonWrapper>
    </TimeWrapper>
  );
};

export default TimeButton;
