import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  MainCardContainer,
  MainCardContent,
  MainCardName,
  MainCardAdress,
  MainCardWrapper,
  MainCardImg,
} from './MainCardStyle';
import { sampleData } from './MainData';
import MainKeyWord from './MainKeyWord';

interface IProps {
  tagState: string
}

// main페이지에 사용할 컴포넌트
function MainCard({tagState}: IProps) {
  // 추후에는 서버에서 데이터를 받아서 데이터를 뿌리겠습니다.
  const [filterData, setFilterData] = useState<object[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:5100/hospital/list/main?page=2&perPage=4&tagName=강아지전문`);
      const data = await res.data;
      console.log(data);
      setFilterData([...data]);
    }
    getData();
  }, [])

  const dataProps = filterData.map((items) => {
    return (
      <MainCardContainer>
        {/* <MainCardImg
          src={}
          alt=""
          width="300px"
          height="285px"
        ></MainCardImg>
        <MainCardContent>
          <MainCardName>{items.hospitalName}</MainCardName>
          <MainCardAdress>{items.address}</MainCardAdress>
          <MainKeyWord mainKeyWord={items.keyWord} />
        </MainCardContent> */}
      </MainCardContainer>
    );
  });

  return <MainCardWrapper>{dataProps}</MainCardWrapper>;
}

export default MainCard;
