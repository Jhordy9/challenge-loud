import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { FiLock, FiLogIn, FiUser, FiMail } from 'react-icons/fi';

import { Container, Content, AnimationContainer } from './styles';
import Input from '../../components/Input/index';
import Button from '../../components/Button';
import { useNotification } from '../../hooks/notification';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addNotification } = useNotification();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Username obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'Senha muito curta, deve conter no mínimo 8 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/register', data);

        history.push('/');

        addNotification({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer login na aplicação!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addNotification({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro, cheque as credenciais e tente novamente',
        });
      }
    },
    [addNotification, history],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="username" icon={FiUser} placeholder="Username" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
