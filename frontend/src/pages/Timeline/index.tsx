/* eslint-disable camelcase */
import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';

import {
  Container,
  Content,
  CreateOpinion,
  Title,
  Description,
  OpinionTimeline,
  Filter,
  Opinions,
  Upvote,
  UpvoteIcon,
} from './styles';
import api from '../../services/api';
import { useNotification } from '../../hooks/notification';
import Button from '../../components/Button/index';
import { useAuth } from '../../hooks/auth';

type UpvotesArray = Array<{
  // eslint-disable-next-line camelcase
  user_id: string;
  opinion_id: number;
}>;

interface UpvoteData {
  upvotes: UpvotesArray;
}

interface CreateOpinionData {
  title: string;
  content: string;
}

interface OpinionData {
  id: number;
  title: string;
  content: string;
  upvotes_count: number;
  available: boolean;
}

const Timeline: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addNotification } = useNotification();
  const { idLogged } = useAuth();

  const [dataOpinions, setDataOpinions] = useState<any[]>([
    async () => {
      await api.get<OpinionData[]>('/opinions');
    },
  ]);
  const [upvote, setUpvote] = useState<UpvotesArray>([]);

  const handleSubmitOpinion = useCallback(
    async (data: CreateOpinionData) => {
      try {
        formRef.current?.setErrors({});

        await api.post('/opinions', data);

        history.push('/timeline');

        addNotification({
          type: 'success',
          title: 'Opinião enviada!',
          description: 'Você já pode ver sua opinião na lista',
        });
      } catch (err) {
        addNotification({
          type: 'error',
          title: 'Erro ao criar opinião',
          description:
            'Ocorreu um erro ao criar uma nova opinião, tente novamente',
        });
      }
    },
    [addNotification, history],
  );

  // const handleSetUpvote = useCallback(async (id: number) => {
  //   const response = await api.get(`/opinions/${id}`);

  //   setUpvote(response.data);
  // }, []);

  useEffect(() => {
    api.get('/opinions').then(response => {
      setDataOpinions(response.data.opinions);
    });
  }, []);

  useEffect(() => {
    dataOpinions?.map(data => {
      api.get<UpvoteData>(`/opinions/${data.id}`).then(response => {
        setUpvote(response.data.upvotes);
      });
    });
  }, [dataOpinions]);

  const infoTimeline = useMemo(() => {
    return dataOpinions.map(
      ({ available, content, id, title, upvotes_count }) => {
        const filterUpvote = upvote
          .filter(data => data.opinion_id === id)
          .find(findUserId => findUserId.user_id === idLogged);

        return {
          content,
          id,
          title,
          upvotes_count,
          available: filterUpvote?.user_id,
        };
      },
    );
  }, [dataOpinions, idLogged, upvote]);

  console.table(infoTimeline);

  return (
    <Container>
      <Content>
        <CreateOpinion>
          <Form ref={formRef} onSubmit={handleSubmitOpinion}>
            <Title name="title" placeholder="Título" />
            <Description name="content" />
            <Button type="submit">Criar opinião</Button>
          </Form>
        </CreateOpinion>
        <strong>Lista de opiniões</strong>

        <Filter />
        {dataOpinions &&
          dataOpinions.map(
            ({ id, title, content, upvotes_count, available }) => (
              <OpinionTimeline key={id}>
                <Opinions>
                  <h3>{title}</h3>
                  <p>{content}</p>

                  <Upvote>
                    <button type="button">
                      <UpvoteIcon available size={20} />
                    </button>
                    <span>{upvotes_count}</span>
                  </Upvote>
                </Opinions>
              </OpinionTimeline>
            ),
          )}
      </Content>
    </Container>
  );
};

export default Timeline;
