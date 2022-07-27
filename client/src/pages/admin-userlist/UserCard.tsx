import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  InfoCard,
  TextContainer,
  Title,
  InfoText,
  StatusContainer,
  Select,
} from '../../components/Liststyle';
function UserCard({ data }: any) {
  const token = localStorage.getItem('token');
  const [status, setStatus] = useState<string>(data?.userStatus);
  useEffect(() => {
    setStatus(data?.userStatus);
  }, [data]);

  const onhandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(event.target.value);
    const id = {
      userId: data._id,
      userStatus: value === 'normal' ? 'expired' : 'normal',
    };

    axios.patch(`http://localhost:5000/api/admin/status`, id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <InfoCard>
      <TextContainer>
        <Title>{data?.role}</Title>
        <InfoText>{data?.userName}</InfoText>
        <InfoText>{data?.email}</InfoText>
        <StatusContainer>
          <Select value={status} onChange={onhandleChange}>
            <option value="normal">회원</option>
            <option value="expired">탈퇴회원</option>
          </Select>
        </StatusContainer>
      </TextContainer>
    </InfoCard>
  );
}

export default UserCard;
