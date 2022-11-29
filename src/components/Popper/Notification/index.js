import { Button, Empty } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import NotificationItem from './NotificationItem';
import styles from './Notification.module.scss';
import { notificationServices } from '~/services';
import { t } from 'i18next';

const cx = classNames.bind(styles);

function NotificationList({ children, items = []}) {
  let [check, setCheck] = useState(0);

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

  useEffect(() => {
    if(check === 2){
      notificationServices.makeReadAllNotification()
    }
  }, [check]);

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
              <Button type="primary" disabled={items.length > 0 ? false : true} onClick={() => {setCheck(2); window.location.reload()}}>
                {t('Notification.MakeAllRead')}
              </Button>
            </div>
            {items.length > 0 ? (
              renderItems()
            ) : (<Empty />)}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default NotificationList;
