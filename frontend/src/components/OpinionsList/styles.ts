import styled from 'styled-components';

import InputSearch from '../InputSearch/index';

export const Container = styled.div``;

export const OpinionTimeline = styled.div`
  width: 650px;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 20px;

  background: #2f4f4f;
`;

export const Filter = styled(InputSearch)``;

export const Opinions = styled.div`
  padding: 15px;
  border: 1px solid #232129;
  border-radius: 10px;

  > p {
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #232129;
    padding-bottom: 3px;
  }

  div {
    margin-top: 15px;
    font-size: 12px;

    li {
      margin-left: 18px;
    }

    a {
      color: #90ee90;
    }

    * {
      font-size: 14px;
      border: none;
    }
  }
`;
