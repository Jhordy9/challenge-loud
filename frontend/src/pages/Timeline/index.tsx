import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  CreateOpinion,
  Title,
  Description,
  OpinionTimeline,
  Filter,
  Opinions,
} from './styles';
import api from '../../services/api';
import { useNotification } from '../../hooks/notification';
import Button from '../../components/Button/index';

interface OpinionData {
  title: string;
  content: string;
}

const Timeline: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addNotification } = useNotification();

  const handleSubmitOpinion = useCallback(
    async (data: OpinionData) => {
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

        <OpinionTimeline>
          <Filter />
          <Opinions />
        </OpinionTimeline>
      </Content>
    </Container>
  );
};

export default Timeline;
