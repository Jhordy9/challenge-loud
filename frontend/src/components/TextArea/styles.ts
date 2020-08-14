import styled from 'styled-components';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const Container = styled.div`
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
