/* eslint-disable camelcase */
import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  SignOutIcon,
  CreateOpinion,
  Title,
  Description,
} from './styles';
import api from '../../services/api';
import { useNotification } from '../../hooks/notification';
import Button from '../../components/Button/index';
import OpinionsList from '../../components/OpinionsList/index';
import { useAuth } from '../../hooks/auth';

interface CreateOpinionData {
  title: string;
  content: string;
}

const Feed: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signOut } = useAuth();
  const { addNotification } = useNotification();

  const handleSubmitOpinion = useCallback(
    async (data: CreateOpinionData) => {
      try {
        formRef.current?.setErrors({});

        await api.post('/opinions', data);

        history.push('/feed');

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

  const handleSignOut = useCallback(() => {
    signOut();

    history.push('/');
  }, [history, signOut]);

  return (
    <Container>
      <Content>
        <SignOutIcon size={40} onClick={handleSignOut} />
        <CreateOpinion>
          <Form ref={formRef} onSubmit={handleSubmitOpinion}>
            <Title name="title" placeholder="Título" />
            <Description name="content" />
            <Button type="submit">Criar opinião</Button>
          </Form>
        </CreateOpinion>
        <strong>Lista de opiniões</strong>

        <OpinionsList />
      </Content>
    </Container>
  );
};

export default Feed;
