import React from 'react'
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

const Line = styled.div`
  border-bottom: 3px solid ${props => props.theme.palette.gray};
  width: 100%;
  opacity: 0;
`;

const TagWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.palette.gray};
  transition: 0.2s all ease-in-out;
  cursor: pointer;

  &:hover {
    color: black;
    
    ${Line} {
      opacity: 1;
    }
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
  const data = [
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

  return (
    <>
        {data.map((category) => {
          return (
            <TagWrapper to='#'>
              {category.image}
              <TagName>{category.tag}</TagName>
              <Line />
            </TagWrapper>
          )
        })}
    </>
  )
}
