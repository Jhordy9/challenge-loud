import React from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container } from './styles';
import Input from '../../components/Input/index';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Input name="name" />
    </Container>
  );
};

export default SignIn;
