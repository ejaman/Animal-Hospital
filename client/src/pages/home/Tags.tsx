import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import {
  faMoon,
  faDove,
  faHotel,
  faScissors,
  faMarsAndVenus,
  faDog,
  faCat,
  faXRay
} from '@fortawesome/free-solid-svg-icons';
import { faEarlybirds } from '@fortawesome/free-brands-svg-icons';
import { CustomAxiosGet } from '../../common/CustomAxios';

const TagImg = styled.img`
  width: 40px;
  transition: 0.2s all ease-in-out;
`;
interface ITagValue {
  tag: number;
  idx: number;
}

const TagWrapper = styled(Link)<ITagValue>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.idx === props.tag ? 'black' : props.theme.palette.gray};
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.idx === props.tag ? 'black' : 'white'};
  ${TagImg} {
    filter: contrast(${props => props.idx === props.tag ? 1 : 0.1});
  }

  &:hover {
    color: black;
    border-bottom: 3px solid ${props => props.theme.palette.gray};
    ${TagImg} {
      filter: contrast(1);
    }
  }

  &:focus {
    border-bottom: 3px solid black;
  }
`;

const TagName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function Tags() {
  // 가데이터
  // const tagData = [
  //   {
  //     tag: '24시간',
  //     image: 'https://cdn-icons.flaticon.com/png/512/654/premium/654994.png'
  //   },
  //   {
  //     tag: '야간진료',
  //     image: 'https://cdn-icons.flaticon.com/png/512/2387/premium/2387930.png'
  //   },
  //   {
  //     tag: '강아지 전문',
  //     image: 'https://cdn-icons-png.flaticon.com/512/7309/7309083.png'
  //   },
  //   {
  //     tag: '고양이 전문',
  //     image: 'https://cdn-icons.flaticon.com/png/512/2138/premium/2138241.png'
  //   },
  //   {
  //     tag: '특수동물',
  //     image: 'https://cdn-icons-png.flaticon.com/512/616/616898.png'
  //   },
  //   {
  //     tag: '호텔',
  //     image: 'https://cdn-icons.flaticon.com/png/512/3009/premium/3009710.png'
  //   },
  //   {
  //     tag: '미용',
  //     image: 'https://cdn-icons.flaticon.com/png/512/4416/premium/4416844.png'
  //   },
  //   {
  //     tag: '중성화 전문',
  //     image: 'https://cdn-icons.flaticon.com/png/512/2517/premium/2517449.png'
  //   },
  //   {
  //     tag: 'MRI',
  //     image: 'https://cdn-icons.flaticon.com/png/512/3213/premium/3213768.png'
  //   },
  // ];

  const [tagData, setTagData] = useState<any>([]); // 태그 데이터 모음
  const [tag, setTag] = useState<number>(-1); // 클릭 된 태그의 인덱스

  useEffect(() => {
    async function getData() {
      const res = await CustomAxiosGet.get('/hostpitalTag/list');
      setTagData(res);
    }
    getData();
    console.log(tagData);
  }, []);


  return (
    <>
        {tagData.map((category:any, idx:number) => {
          return (
            <TagWrapper
              key={idx}
              idx={idx}
              to='#'
              onClick={() => setTag(idx)}
              tag={tag}
            >
              <TagImg src={category.image} />
              <TagName>{category.tag}</TagName>
            </TagWrapper>
          )
        })}
    </>
  )
}
