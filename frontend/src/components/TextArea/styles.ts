import styled, { css } from 'styled-components';
import ReactMde from 'react-mde';

import Tooltip from '../Tooltip/index';
import 'react-mde/lib/styles/css/react-mde-all.css';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #2f4f4f;
  border-radius: 10px;
  padding: 16px;
  width: 700px;

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


  div {
    border: none;

    color: #c9c9c9;

    .grip {
      background-color: transparent;
      border: none;

      svg {
        display: none;
      }
    }



    .mde-header {
      background: #2f4f4f;
    }

      .mde-tabs {
      background: #2f4f4f;
    }

    button.selected {
      width: 80px;
    }

    button {
      color: #c9c9c9;
    }

    .mde-header-group {
      background: #2f4f4f;
    }

    svg {
      color: #c9c9c9;
    }
  }
`;

export const Markdown = styled(ReactMde)``;

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
