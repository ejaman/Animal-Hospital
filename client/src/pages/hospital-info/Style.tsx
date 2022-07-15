import styled from "styled-components";
import { theme } from '../../styles/Colors';

const SubTitle = styled.span`
  font-size: 16px;
`
/* 사진 추가 css */

const UploadFileLabel = styled.label`
  display: inline-block;
  padding: .5em .8em;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid ${theme.palette.lightgray};
  border-radius: .25em;

  :hover {
    transition: 2ms ease-in;
    border-color: ${theme.palette.blue};
    color: ${theme.palette.blue};
  }
`
const UploadFileInput = styled.input`
  position: absolute;
  padding: 0;
  margin: -1px;
  clip:rect(0,0,0,0);
  border: 0;
`

/* keyword css */
  
const KeywordInput = styled.div`
  margin: 24px 24px;
  border-bottom: 2px solid ${theme.palette.gray};
  color: rgb(52, 58, 64);
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: ${theme.palette.gray};
  padding: 2px 2px 8px 2px;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top: 5px;
    background: #d1edff;
    border-radius: 56px;
    padding: 8px 12px;
    color: ${theme.palette.blue};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    // font-size: 1.4rem;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
  }

  .HashInput {
    width: auto;
    margin: 10px;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    min-width: 8rem;
    border: none;
  }
`

export { SubTitle, UploadFileLabel, UploadFileInput, KeywordInput };