import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import * as Showdown from 'showdown';

import { Container, Markdown } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container data-testid="textArea-container">
      <Markdown
        refs={{ textarea: textAreaRef }}
        toolbarCommands={[
          ['header', 'bold', 'italic', 'strikethrough'],
          ['link', 'quote', 'code', 'image'],
          ['unordered-list', 'ordered-list'],
        ]}
        initialEditorHeight={200}
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={
          markdown => Promise.resolve(converter.makeHtml(markdown))
          // eslint-disable-next-line react/jsx-curly-newline
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
          textArea: {
            style: { background: 'none', height: '150px', color: '#f4ede8' },
            placeholder: 'Digite sua opinião aqui!',
            defaultValue,
            name,
          },
        }}
      />
    </Container>
  );
};

export default TextArea;
