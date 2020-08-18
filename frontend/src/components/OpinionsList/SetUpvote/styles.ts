import styled from 'styled-components';
import { TiStarFullOutline } from 'react-icons/ti';

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

export const UpvoteIcon = styled(TiStarFullOutline)`
  margin-right: 10px;
  color: #fff;

  svg .liked {
    color: #000;
  }
`;
