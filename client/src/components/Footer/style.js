import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  height: 150px;
  border-top: 1px solid #dbdbdb;
  background-color: #fafbfc;
`;

export const FooterWrap = styled.div`
  width: 80%;
  height: 100%;

  max-width: 1600px;

  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 24px;
  padding-bottom: 32px;
`;

export const FooterBody = styled.div`
  width: 100%;
  margin-bottom: 16px;
  font-size: 14px;

  & > div {
    display: flex;
    justify-content: flex-start;

    & > div:nth-child(1) {
      width: 87px;
      font-weight: bold;
    }
    & a {
      color: #777;
    }
  }
`;

export const BeforeSpan = styled.span`
  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 11px;
    background-color: #e4e8eb;
    vertical-align: -1px;
    margin: 0 8px;
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  color: #a5a5a5;
  font-size: 14px;
  text-align: center;
`;
