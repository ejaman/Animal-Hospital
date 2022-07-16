import React, { useState } from "react";
import {
  PetCardContainer,
  DeleteBtn,
  ImgContainer,
  InfoContainer,
  InfoInput,
  InfoTextarea,
  NameInput,
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  PetImg,
  Contents,
} from "./PetInfoStyle";
function PetCard() {
  const [select, setSelect] = useState("F");

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelect(value);
  };
  return (
    <PetCardContainer>
      <DeleteBtn>
        <i className="fa-solid fa-circle-minus fa-xl"></i>
      </DeleteBtn>
      <Contents>
        <ImgContainer>
          <PetImg src="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA=" />
        </ImgContainer>
        <InfoContainer>
          <NameInput value="Name" />
          <Contents>
            <InfoInput value="species" />
            <InfoInput value="breed" />
          </Contents>
          <InfoInput value="age" />
          <InfoInput value="weight" />
          <Contents>
            <Item>
              <RadioText>성별</RadioText>
            </Item>
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="F"
                  checked={select === "F"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>F</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="M"
                  checked={select === "M"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>M</RadioText>
              </Item>
            </RadioContainer>
          </Contents>
          <Contents>
            <Item>
              <RadioText>중성화</RadioText>
            </Item>
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="완료"
                  checked={select === "완료"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>완료</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="미완료"
                  checked={select === "미완료"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>미완료</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="모름"
                  checked={select === "모름"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>모름</RadioText>
              </Item>
            </RadioContainer>
          </Contents>
          <InfoTextarea value="medicalHistorys" />
          <InfoTextarea value="vaccination" />
          {/* <Btn>
        <i className="fa-solid fa-paw"></i>
      </Btn> */}
        </InfoContainer>
      </Contents>
    </PetCardContainer>
  );
}

export default PetCard;
