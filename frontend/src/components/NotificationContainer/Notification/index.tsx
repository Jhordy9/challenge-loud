import React, { useEffect } from 'react';

import {
  FiXCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
} from 'react-icons/fi';
import {
  NotificationMessage,
  useNotification,
} from '../../../hooks/notification';

import { Container } from './styles';

interface NotificationProps {
  message: NotificationMessage;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Notification: React.FC<NotificationProps> = ({ message, style }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeNotification]);

  return (
    <Container
      type={message.type}
      style={style}
      notification={Number(!!message.description)}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeNotification(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Notification;
