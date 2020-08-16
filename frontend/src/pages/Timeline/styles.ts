import styled from 'styled-components';

import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import Input from '../../components/Input/index';
import TextArea from '../../components/TextArea/index';

interface IconProps {
  available?: boolean;
}

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

export const OpinionTimeline = styled.div`
  width: 650px;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 20px;

  background: #2f4f4f;
`;

export const Filter = styled.div``;

export const Opinions = styled.div`
  padding: 15px;
  border: 1px solid #232129;
  border-radius: 10px;

  h3 {
    font-weight: 500;
    font-size: 20px;
  }

  p {
    margin-top: 15px;
    font-size: 16px;
  }
`;

export const Upvote = styled.div`
  margin-top: 10px;
  display: flex;

  button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
  }

  span {
    color: whitesmoke;
  }
`;

export const UpvoteIcon = styled(TiStarFullOutline) <IconProps>`
  margin-right: 10px;
  color: ${props => (props.available === true ? '#000' : '#fff')};
`;
