import { Card } from 'antd';
import styled from 'styled-components';

export const OfficeContainer = styled.div`
  width: 1024px;
  max-width: 1120px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -5%;
  margin-bottom: 64px;

  & > a {
    float: right;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const CardWrap = styled.div`
  width: 20rem;
  margin: 1rem;
`;

export const CardContent = styled(Card)`
  height: 213px;
  border-bottom: 2px solid #1990ff;
  border-radius: 4px;
`;
