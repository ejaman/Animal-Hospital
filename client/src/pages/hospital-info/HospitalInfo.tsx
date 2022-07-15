import React, { useState, useCallback, useEffect } from 'react';
import "antd/dist/antd.min.css";
import { Button, Form, Input, Typography, Row, Col} from "antd";import { theme } from '../../styles/Colors';
import { SubTitle,
  UploadFileLabel,
  UploadFileInput,
  KeywordInput
} from "./Style";
import { HospitalInfoType, HospitalServiceInfoType } from "./Interface";
import axios from "axios";

const { Title } = Typography;

export default function HospitalInfo() {
  /* axios api */
  // const [datas, setDatas] = useState<[]>([]);
  // // 병원 api 생기면 주석 풀고 나머지 작성 예정
  // const API_URL = `http://localhost:5100/api/user`;

  // useEffect(() => {
  //   if (datas.length) console.log("datas:", datas);
  // }, [datas]);

  // const getAPI = useCallback(
  //   async (e: any) => {
  //     e.preventDefault();
  //     const result = await axios.get(API_URL);
  //     console.log("result.data: ", result.data);
  //   },
  //   [API_URL]
  // );

  // office hour: validation 시 e.target.value를 바로 비교하면 밀리지 않게 바로바로 비교 가능

  /* elements */
  const $HashWrapOuter = document.querySelector('.HashWrapOuter');
  const $HashWrapInner = document.createElement('div');
  $HashWrapInner.className = 'HashWrapInner';
  const $keywordNumWarning = document.querySelector('.keywordNumWarning');

  /* states */
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfoType>();
  const [hospitalServiceInfo, setHospitalServiceInfo] = useState<HospitalServiceInfoType>();
  const [image, setImage] = useState('');
  const [keyword, setKeyword] = useState(['']);
  const [newKeyword, setNewKeyword] = useState('');
  // const [serviceName, setServiceName] = useState("");
  // const [servicePrice, setServicePrice] = useState(-999);
  // const [serviceDesc, setServiceDesc] = useState("");
  // const [serviceCapacity, setServiceCapacity] = useState(-999);

  /* values */
  const timeList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  
  // const { postalCode, address1, address2 } = jsonData.address;
  // const email = jsonData.email;

  /* constants */
  const AVAILABLE_KEYWORD_LENGTH = 10;
  const AVAILABLE_KEYWORD_COUNTS = 3;
  
  /* image converter */
  const convertFileToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve: any) => {
      if (reader) {
        reader.onload = () => {
        setImage(reader.result as string);
        resolve();
        };
      }
    });
  };

  /* onChange handlers */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const hospitalData = {
      ...hospitalInfo,
      [e.currentTarget.name]: e.currentTarget.value
    };
    const hospitalServiceData = {
      ...hospitalServiceInfo,
      [e.currentTarget.name]: e.currentTarget.value
    }
    // setHospitalInfo(hospitalData);
    // setHospitalServiceInfo(hospitalServiceData);
  };


  // const onChangeName = (e: any) => {
  //   setName(e.target.value);
  //   // api 추가 예정
  //   console.log("이름 변경:", e.target.value);
  // }
  // const onChangeDirector = (e: any) => {
  //   setDirector(e.target.value);
  //   console.log("대표자명 변경:", e.target.value);
  // }
  // const onChangePhoneNumber = (e: any) => {
  //   setPhoneNumber(e.target.value);
  //   console.log("연락처 변경:", e.target.value);
  // }
  // const onChangeLicenseNumber = (e: any) => {
  //   setPhoneNumber(e.target.value);
  //   console.log("면허번호 변경:", e.target.value);
  // }
  // const onChangeHospitalCapacity = (e: any) => {
  //   setHospitalCapacity(e.target.value);
  //   console.log("시간당 예약 가능 고객 수 변경:", e.target.value);
  // }
  // const onChangeBusinessNumber = (e: any) => {
  //   setBusinessNumber(e.target.value);
  //   console.log("사업자 등록번호 변경:", e.target.value);
  // }
  // const onChangeServiceName = (e: any) => {
  //   setServiceName(e.target.value);
  //   console.log("서비스명 변경:", serviceName);
  // }
  // const onChangeServicePrice = (e: any) => {
  //   setServicePrice(e.target.value);
  //   console.log("서비스 가격 변경:", servicePrice);
  // }
  // const onChangeServiceDesc = (e: any) => {
  //   setServiceDesc(e.target.value);
  //   console.log("서비스 설명 변경:", serviceDesc);
  // }

  const onKeyUp = useCallback(
    (e: any) => {
      
      /* 입력 시마다 입력 값 갱신 */
      setNewKeyword(e.target.value);

      /* 키워드 클릭 시 키워드 삭제 */
      $HashWrapInner.addEventListener('click', () => {
        $HashWrapOuter?.removeChild($HashWrapInner)
        console.log($HashWrapInner.innerHTML)
        console.log("newKeyword:", newKeyword)
        setKeyword(keyword.filter((newKeyword: any) => newKeyword))
      })

      /* enter's key code: 13 */
      // if (e.keyCode === 13  && e.target.value.trim() !== '') {
      if (e.keyCode === 13 && $keywordNumWarning) {
        if (newKeyword.length > AVAILABLE_KEYWORD_LENGTH) {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_LENGTH}글자 미만이어야 합니다.`
        }
        else if ($HashWrapOuter && newKeyword && keyword.length <= AVAILABLE_KEYWORD_COUNTS) {
          $HashWrapInner.innerHTML = '#' + newKeyword;
          $HashWrapOuter.appendChild($HashWrapInner);
          let copyKeyword = [...keyword];
          copyKeyword.push(newKeyword);
          setKeyword(copyKeyword);
          console.log("Enter Key Pressed. e.target.value:", e.target.value, "keyword:", keyword, "newKeyword:", newKeyword, "copyKeyword(이쪽 데이터를 전달할 예정):", copyKeyword);
          $keywordNumWarning.textContent = "키워드가 정상적으로 등록되었습니다."
          setNewKeyword('');
          console.log("등록 이후 newKeyword", newKeyword)
        }
        else {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_COUNTS}개까지 등록 가능합니다.`
          setNewKeyword('');
          console.log("초과 등록 실패 이후 newKeyword", newKeyword)
        }
      }
    },
    [keyword, newKeyword, $HashWrapInner, $HashWrapOuter, $keywordNumWarning]
  )

  const onServiceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const f = document.hospitalInfoForm;

    // if () {

    // } else {
    //   alert("모든 항목을 입력해주세요");
    // }
  }

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert(
      '버튼이 클릭되었습니다(확인용)'
    )
  };
  
  const withdrawButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert('병원 회원 탈퇴 버튼이 클릭되었습니다(확인용)')
  }


  useEffect(() => {
    // 임시 데이터 (api 추가 후 삭제 예정)
    setHospitalInfo({
      "name": "이이진진수수 동동물물병병원원",
      "email": "sarangS2hospital@gmail.com",
      "director": "이진수",
      "password": "12345",
      "address": {
        "postalCode": "13477",
        "address1": "경기 성남시 분당구 판교공원로5길 15",
        "address2": "이진수 동물병원"
      },
      "phoneNumber": "010-0000-0000",
      "businessHours": "24",
      "businessNumber": "546521354",
      "licenseNumber": "XXXXXXXXX",
      "holiday": [""],
      "hospitalCapacity": 3,
      "tag": "",
      "keyword": ["소동물 전문"],
      // "image": "https://o-oa.com/wp-content/uploads/2020/05/LJS_01.jpg",
      "image": ""
    })
    setHospitalServiceInfo({
      "serviceName": "",
      "servicePrice": 0,
      "serviceDesc": "",
      "serviceCapacity": 0
    })

  }, []);

  return (
    <div style={{ margin: "0 2rem 2rem 2rem" }}>
      <div className="ant-typography">
        <Title>병원 정보</Title>
      </div>
      <div
        style={{
          // display: "grid",
          // justifyContent: 'center',
          // alignItems: 'center',
          borderStyle: "solid",
          borderColor: `${theme.palette.orange}`,
          borderWidth: "10px",
          borderRadius: "5%",
          padding: "1rem 2rem 1rem 2rem",
          // maxWidth: "960px"
        }}
      >
        <Row>
          <Col span={12}>
            <Form name="hospitalInfoForm">
              <Row>
                <SubTitle>병원명</SubTitle>
                <input
                  name="name"
                  style={{
                    marginBottom: "1rem",
                    marginLeft: "0.5rem"
                  }}
                  type="text"
                  defaultValue={hospitalInfo?.name || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>이름</SubTitle>
                <input
                  name="director"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.director || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>이메일</SubTitle>
                <input
                  name="email"
                  style={{
                    marginBottom: "1rem",
                    marginLeft: "0.5rem"
                  }}
                  type="text"
                  defaultValue={hospitalInfo?.email}
                  autoComplete="username"
                  disabled
                />
              </Row>
              <Row>
                <SubTitle>비밀번호</SubTitle>
                <input
                  name="password"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="password"
                  autoComplete="current-password"
                  defaultValue=""
                  disabled
                />
                <Button
                    style={{ marginLeft: "0.5rem" }}
                    onClick={buttonHandler}
                  >변경</Button>
              </Row>
              <Row>
                <SubTitle>병원 연락처</SubTitle>
                <input
                  name="phoneNumber"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.phoneNumber || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>사업자 등록번호</SubTitle>
                <input
                  name="businessNumber"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.businessNumber || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>면허번호</SubTitle>
                <input
                  name="licenseNumber"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.licenseNumber || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>병원 사진</SubTitle>
                <div style={{ marginBottom: "0.5rem" }} />
                <div style={{ marginBottom: "0.5rem" }}>
                  <UploadFileLabel htmlFor="uploadFile">업로드</UploadFileLabel>
                  <UploadFileInput type="file"
                    id="uploadFile"
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    name='profile_img'
                    onChange={(e: any) => {
                      convertFileToBase64(e.target.files[0]);
                      console.log(e.target.files);
                    }}
                  />
                </div>
                <div>
                  {image && <img src={image} width="280px" alt="" />}
                </div>
              </Row>
              <div style={{ marginBottom: "0.5rem" }} />
              <Row>
                <SubTitle>주소</SubTitle>
                <input
                  name="postalCode"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.address?.postalCode || ""}
                />
                <input
                  name="address1"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.address?.address1}
                />
                <input
                  name="address2"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.address?.address2}
                />
                <Button style={{ marginLeft: "0.5rem" }}>수정</Button>
              </Row>
              <Row>
                <SubTitle>카테고리</SubTitle>
                <input
                  name="tag"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.tag || ""}
                />
              </Row>
              <Row>
                <SubTitle>키워드</SubTitle>
                <span
                  style={{
                    marginLeft: "1rem",
                    color: `${$keywordNumWarning?.textContent === "키워드가 정상적으로 등록되었습니다." ? theme.palette.blue : theme.palette.peach}`
                  }}
                  className="keywordNumWarning"
                ></span>
                <KeywordInput>
                  <div className="HashWrapOuter"></div>
                  {/* {INITIAL_KEYWORDS.map((item, index) => {
                    $HashWrapInner.innerHTML = '#' + item;
                    $HashWrapOuter?.appendChild($HashWrapInner);
                    return (
                      <span key={index}></span>
                    )
                  })} */}
                  <input
                    name="keyword"
                    className="HashInput"
                    type="text"
                    onKeyUp={onKeyUp}
                    placeholder="키워드 입력"
                  />
                </KeywordInput>
              </Row>
              <Row>
                <Col>
                  <SubTitle
                    style={{
                      marginBottom: "1rem"
                    }}
                  >영업시간</SubTitle>
                  <Row>휴무일 선택</Row>
                  <Row
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <Button id="Mon">월</Button>
                    <Button id="Tues">화</Button>
                    <Button id="Wed">수</Button>
                    <Button id="Thurs">목</Button>
                    <Button id="Fri">금</Button>
                    <Button id="Sat">토</Button>
                    <Button id="Sun">일</Button>
                  </Row>
                  <Row>시간 선택</Row>
                  <Row>
                    {timeList.map((time) => (
                      <Button id={time} key={time}>{time}:00</Button>
                    ))}
                  </Row>
                  <Row style={{ marginTop: "1rem" }}>
                    <SubTitle>시간당 예약가능 고객 수</SubTitle>
                    <input
                      name="hospitalCapacity"
                      style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                      type="text"
                      defaultValue={hospitalInfo?.hospitalCapacity || 0}
                      onChange={onChange}
                    />
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Form>
              <Row>
                <SubTitle
                  style={{
                    margin: "auto",
                    fontWeight: "bold"
                  }}
                >서비스 추가</SubTitle>
              </Row>
              <Row>
                <div>
                  <label>서비스명</label>
                  <input
                    className="serviceName"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem"
                    }}
                  />
                </div>
              </Row>
              <Row>
                <div>
                  <label>서비스 가격</label>
                  <input
                    name="servicePrice"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem"
                    }}
                  />
                </div>
              </Row>
              <Row>
                <div>
                  <label>서비스 설명</label>
                  <input
                    name="serviceDetail"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem"
                    }}
                  />
                </div>
              </Row>
              <Row>
                <div>
                  <label>서비스 동시 수용가능인원수</label>
                  <input
                    name="serviceCapacity"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem"
                    }}
                  />
                </div>
              </Row>
              <Row>
              <Button
                style={{
                  marginLeft: "0.5rem",
                  marginBottom: "1rem",
                  margin: "auto"
                }}
                onSubmit={onServiceSubmit}
              >추가</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      <Row>
          <Button
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
            onClick={withdrawButtonHandler}
          >탈퇴</Button>
      </Row>
    </div>
  );
}

