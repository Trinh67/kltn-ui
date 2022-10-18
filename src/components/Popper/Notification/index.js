import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import NotificationItem from './NotificationItem';
import styles from './Notification.module.scss';
import { Button } from 'antd';
import { notificationServices } from '~/services';

const cx = classNames.bind(styles);

function NotificationList({ children, items = []}) {
  let isFirst = true;
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
  const readAllNoti = () => {
    if(items.length > 0 && !isFirst){
      notificationServices.readAllNotification()
    }
    isFirst = false;
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
              <p>Danh sach thong bao</p>
              {readAllNoti()}
              {/*<Button type="primary" onClick={}>Tat ca da doc</Button>*/}
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
