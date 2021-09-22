import { Button, Card } from 'antd';
import styled from 'styled-components';

export const InnerContainer = styled.div`
  width: 90%;
  max-width: 1600px;
  height: 400px;
  position: relative;
  top: -130px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 2px;
  z-index: 5;
  padding: 32px;
  box-shadow: 0 10px 30px 0 rgb(72 118 239 / 10%);

  & > div:nth-child(1) {
    width: 70%;
  }
`;

export const NavButton = styled(Button)`
  border-radius: 20px;
  margin-right: 8px;
  width: 95px;
`;

export const CardContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-start;
`;

export const CardContent = styled(Card)`
  width: 250;
  height: 270px;
  margin-right: 32px;
`;

export const AsideBox = styled.div`
  width: 30%;
  border-left: 1px solid #eaedf4;
  padding: 32px;
  text-align: center;
  padding-top: 140px;

  & > div {
    margin-bottom: 16px;
  }
`;
