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

  &:hover {
    color: black;
    border-bottom: 3px solid ${props => props.theme.palette.gray};
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
  const tagData = [
    {
      tag: '24시간',
      image: <FontAwesomeIcon icon={faEarlybirds} size='3x' />
    },
    {
      tag: '야간진료',
      image: <FontAwesomeIcon icon={faMoon} size='3x' />
    },
    {
      tag: '강아지 전문',
      image: <FontAwesomeIcon icon={faDog} size='3x' />
    },
    {
      tag: '고양이 전문',
      image: <FontAwesomeIcon icon={faCat} size='3x' />
    },
    {
      tag: '특수동물',
      image: <FontAwesomeIcon icon={faDove} size='3x' />
    },
    {
      tag: '호텔',
      image: <FontAwesomeIcon icon={faHotel} size='3x' />
    },
    {
      tag: '미용',
      image: <FontAwesomeIcon icon={faScissors} size='3x' />
    },
    {
      tag: '중성화 전문',
      image: <FontAwesomeIcon icon={faMarsAndVenus} size='3x' />
    },
    {
      tag: 'MRI',
      image: <FontAwesomeIcon icon={faXRay} size='3x' />
    },
  ];

  // const [tagData, setTagData] = useState<any>([]); // 태그 데이터 모음
  const [tag, setTag] = useState<number>(-1); // 클릭 된 태그의 인덱스

  // useEffect(() => {
  //   async function getData() {
  //     const res = await CustomAxiosGet.get('/hostpitalTag/list');
  //     setTagData(res);
  //   }
  //   getData();
  //   console.log(tagData);
  // }, [])


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
              {category.image}
              <TagName>{category.tag}</TagName>
            </TagWrapper>
          )
        })}
    </>
  )
}
