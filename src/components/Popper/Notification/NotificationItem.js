import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function NotificationItem({ data, onClick }) {
    return (
      <>
        <div className={cx('notification-item')}>
          <p>{data.createdAt}</p>
          <p>{data.content}</p>
        </div>
      </>
    );
}

export default NotificationItem;
