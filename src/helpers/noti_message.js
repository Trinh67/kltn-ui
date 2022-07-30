import { notification } from 'antd';

import { t } from '~/helpers/i18n';

const SuccessMessage = (msg) => {
  notification.success({
    message: t('Messages.Successful'),
    description: `${msg}!`,
    style: { color: 'green' },
  });
};

const ErrorMessage = (msg) => {
  notification.error({
    message: t('Messages.Error'),
    description: `${msg}!`,
    style: { color: 'red' },
  });
};

export default {
  SuccessMessage,
  ErrorMessage,
};
