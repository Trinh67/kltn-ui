import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import NotificationItem from './NotificationItem';
import styles from './Notification.module.scss';
import { Button } from 'antd';
import { notificationServices } from '~/services';
import { t } from 'i18next';

const cx = classNames.bind(styles);

function NotificationList({ children, items = []}) {

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <NotificationItem
          key={index}
          data={item}
          onClick={() => {}}
        />
      );
    });
  };

  const makeAllRead = () => {
      if(items.length > 0){
        notificationServices.makeReadAllNotification()
      }
  }

  return (
    <Tippy
      interactive
      delay={[0, 200]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('notification-list')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('notification-popper')}>
            <div className={cx('title')}>
              <p>{t('Notification.List')}</p>
              <Button type="primary">{t('Notification.MakeAllRead')}</Button>
            </div>
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default NotificationList;
