import { notification } from 'antd';

const SuccessMessage = (msg) => {
  notification.success({
    message: `Successful`,
    description: `${msg}!`,
    style: { color: 'green' },
  });
};

const ErrorMessage = (msg) => {
  notification.error({
    message: `Error`,
    description: `${msg}!`,
    style: { color: 'red' },
  });
};

export default {
  SuccessMessage,
  ErrorMessage,
};
