import React, { useEffect, useState } from "react";
import {
  InfoCard,
  TextContainer,
  Title,
  InfoText,
  StatusContainer,
  Select,
} from "../../components/Liststyle";
function UserCard({ data }: any) {
  const [status, setStatus] = useState<string>(data?.userStatus);
  const onhandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <InfoCard>
      <TextContainer>
        <Title>{data?.role}</Title>
        <InfoText>{data?.userName}</InfoText>
        <InfoText>{data?.email}</InfoText>
        <StatusContainer>
          <Select value={data?.userStatus} onChange={onhandleChange}>
            <option value="normal">회원</option>
            <option value="expired">탈퇴회원</option>
          </Select>
        </StatusContainer>
      </TextContainer>
    </InfoCard>
  );
}

export default UserCard;
