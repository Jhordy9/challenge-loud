import styled from 'styled-components';

import Input from '../../components/Input/index';
import TextArea from '../../components/TextArea/index';

export const Container = styled.div``;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    font-size: 30px;
    color: whitesmoke;
    border-bottom: 1px solid forestgreen;
    margin-bottom: 10px;
  }
`;

export const CreateOpinion = styled.div`
  margin-bottom: 70px;
`;

export const Title = styled(Input)`
  width: 400px;
`;

export const Description = styled(TextArea)``;
