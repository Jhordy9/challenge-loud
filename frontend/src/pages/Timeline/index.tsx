import React, { useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

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

const Timeline: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Content>
        <CreateOpinion>
          <Form ref={formRef} onSubmit={() => { }}>
            <Title name="title" placeholder="Título" />
            <Description
              name="description"
              placeholder="Deixe sua opinião aqui"
            />
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
