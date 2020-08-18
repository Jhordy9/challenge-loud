/* eslint-disable camelcase */
import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Container, Upvote, UpvoteIcon } from './styles';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';
import { setLikedState } from '../../../atoms/index';

interface SingleOpinion {
  opinion_id: number;
  user_id: string;
}

interface UpvoteData {
  upvotes: SingleOpinion[];
}

interface Params {
  id: number;
  upvotes_count: number;
}

const SetUpvote: React.FC<Params> = ({ id, upvotes_count }) => {
  const { idLogged } = useAuth();

  const liked = useRecoilValue(setLikedState);
  const [editLiked, setEditLiked] = useRecoilState(setLikedState);

  const handleInsertUpvote = useCallback(
    async (opinion_id: number) => {
      const checkUpvote = await api.get<UpvoteData>(`/opinions/${opinion_id}`);

      const getUserId = checkUpvote.data.upvotes.find(
        dt => dt.user_id === idLogged,
      );

      if (getUserId?.user_id !== idLogged) {
        await api.post(`/opinions/${opinion_id}/vote`);
        setEditLiked(liked + 1);
      } else if (getUserId?.user_id === idLogged) {
        await api.delete(`/opinions/${opinion_id}/vote`);
        setEditLiked(liked - 1);
      }
    },
    [idLogged, liked, setEditLiked],
  );

  return (
    <Container>
      <Upvote>
        <button type="button" onClick={() => handleInsertUpvote(id)}>
          <UpvoteIcon size={20} />
        </button>

        <span>{upvotes_count}</span>
      </Upvote>
    </Container>
  );
};

export default SetUpvote;
