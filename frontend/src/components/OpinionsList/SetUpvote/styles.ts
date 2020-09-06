import styled from 'styled-components';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

export const Container = styled.div``;

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

export const HasUpvoteIcon = styled(TiStarFullOutline)`
  margin-right: 10px;
  color: #90ee90;
`;

export const UpvoteIcon = styled(TiStarOutline)`
  margin-right: 10px;
  color: #90ee90;
`;
