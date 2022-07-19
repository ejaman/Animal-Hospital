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
import MainKeyWord from './MainKeyWord';

interface IProps {
  tagState: string,
  offset: number,
  limit: number,
  setTotal: (total: number) => void,
}

interface IData {
  starRating: number,
  name: string,
  address: {
    postalCode: string,
    address1: string,
    address2: string
  },
  phoneNumber: string,
  businessHours: number[],
  holiday: string[],
  tag: string[],
  keyword: string[],
  image: string[],
  hospitalCapacity: number
}

// main페이지에 사용할 컴포넌트
function MainCard({tagState, offset, limit, setTotal}: IProps) {
  // 추후에는 서버에서 데이터를 받아서 데이터를 뿌리겠습니다.
  const [filterData, setFilterData] = useState<IData[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:5100/hospital/list/main?page=2&perPage=4&tagName=강아지전문`); // TODO: tagName=tagState로 변경. page 변경
      const data = await res.data.data.hospitals;
      setFilterData([...data]);
      setTotal(data.length);
    }
    getData();
  }, [])

  const dataProps = filterData.slice(offset, offset+limit).map((items) => {
    return (
      <MainCardContainer to={`hospital/${items.name}/detail`}>
        <MainCardImg
          src={items.image[0]}
          alt=""
          width="300px"
          height="285px"
        ></MainCardImg>
        <MainCardContent>
          <MainCardName>{items.name}</MainCardName>
          <MainCardAdress>{items.address.address1} {items.address.address2}</MainCardAdress>
          <MainKeyWord mainKeyWord={items.keyword} />
        </MainCardContent>
      </MainCardContainer>
    );
  });

  return <MainCardWrapper>{dataProps}</MainCardWrapper>;
}

export default MainCard;
