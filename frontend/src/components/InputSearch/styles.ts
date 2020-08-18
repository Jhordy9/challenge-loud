import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #2f4f9f;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #c9c9c9;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #90ee90;
      border-color: #90ee90;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #90ee90;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    margin-left: 16px;

    &::placeholder {
      color: #c9c9c9;
    }
  }
`;
