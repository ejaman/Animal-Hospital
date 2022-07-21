import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomAxiosGet } from "../../common/CustomAxios";
import TimeButton from "../../components/detail/TimeButton";
import MainKeyWord from "../../components/main/MainKeyWord";
import CalendarUi from "./Calendar";
import {
  ContentContainer,
  Header,
  ImgContainer,
  InfoContainer,
  InfoDiv,
  InfoTitle,
  MainContainer,
  MainImg,
  MainInfo,
  Reservation,
  ReservationContainer,
  ReviewContainer,
  RightBottomImg,
  RightTopImg,
} from "./DetailStyle";
import HospitalService from "./HospitalService";
import PetSelect from "./PetSelect";

function Detail() {
  const { hospitalName } = useParams();
  const [hospitalInfo, setHospitalInfo] = useState<any>({});

  const fetchGetData = async () => {
    await CustomAxiosGet.get(`/hospital/${hospitalName}/detail`).then((res) =>
      setHospitalInfo(res.data.data.hospDetailInfo)
    );
  };
  useEffect(() => {
    fetchGetData();
  }, []);

  console.log(hospitalInfo);

  return (
    <MainContainer>
      <Header>
        <h1>{hospitalInfo.name}</h1>
        <p>주소: {hospitalInfo.address?.postalCode}</p>
      </Header>
      <ImgContainer>
        <MainImg
          width="680px"
          height="433.66px"
          src={hospitalInfo.image && hospitalInfo.image[0]}
          alt="img"
        />
        <div>
          <RightTopImg
            width="320px"
            height="216.83px"
            src={hospitalInfo.image && hospitalInfo.image[1]}
            alt="img"
          />
          <RightBottomImg
            width="320px"
            height="213.33px"
            src={hospitalInfo.image && hospitalInfo.image[2]}
            alt="img"
          />
        </div>
      </ImgContainer>
      <ContentContainer>
        <InfoContainer>
          <InfoDiv>
            <InfoTitle>{hospitalInfo.name}</InfoTitle>
            <p>카테고리</p>
            {hospitalInfo.tag && (
              <MainKeyWord
                mainKeyWord={hospitalInfo.tag.map(
                  (items: { name: string }) => items.name
                )}
              />
            )}
          </InfoDiv>
          <MainInfo>
            <div>키워드</div>
            {hospitalInfo.keyword && (
              <MainKeyWord mainKeyWord={hospitalInfo.keyword} />
            )}
          </MainInfo>
          <ReviewContainer>
            <h3>Review!</h3>
          </ReviewContainer>
        </InfoContainer>
        <ReservationContainer>
          <Reservation>
            <CalendarUi />
            {/* TODO: time 타입 오류 해결되면 진행하겠습니다. */}
            {hospitalInfo.businessHours && (
              <TimeButton time={hospitalInfo.businessHours} />
            )}
            <HospitalService />
            <PetSelect />
          </Reservation>
        </ReservationContainer>
      </ContentContainer>
    </MainContainer>
  );
}

export default Detail;
