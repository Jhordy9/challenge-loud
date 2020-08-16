import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #2f4f4f;
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
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

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

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
