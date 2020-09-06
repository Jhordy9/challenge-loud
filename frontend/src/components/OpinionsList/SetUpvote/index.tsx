/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Container, Upvote, UpvoteIcon, HasUpvoteIcon } from './styles';
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

  const [hasUpvote, setHasUpvote] = useState(false);

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
        setHasUpvote(true);
      } else if (getUserId?.user_id === idLogged) {
        await api.delete(`/opinions/${opinion_id}/vote`);
        setEditLiked(liked - 1);
        setHasUpvote(false);
      }
    },
    [idLogged, liked, setEditLiked],
  );

  useEffect(() => {
    api.get<UpvoteData>(`/opinions/${id}`).then(res => {
      res.data.upvotes.find(dt => {
        return setHasUpvote(Boolean(dt.user_id === idLogged));
      });
    });
  }, [id, idLogged, handleInsertUpvote]);

  return (
    <Container>
      <Upvote>
        <button type="button" onClick={() => handleInsertUpvote(id)}>
          {hasUpvote === true ? (
            <HasUpvoteIcon size={20} />
          ) : (
              <UpvoteIcon size={20} />
            )}
        </button>

        <span>{upvotes_count}</span>
      </Upvote>
    </Container>
  );
};

export default SetUpvote;
