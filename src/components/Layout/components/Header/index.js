import React, { useEffect, useState } from 'react';
import cookies from 'js-cookies';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faEarthAsia,
  faEllipsisVertical,
  faChartLine,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { Modal } from 'antd';
import Search from '../Search';
import { t } from '~/helpers/i18n';
import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import { browserHistory } from '~/helpers';
import Menu from '~/components/Popper/Menu';
import localizationHelpers from '~/helpers/localization';
import localizationConstants from '~/constants/localization';
import { NotificationIcon, UploadIcon } from '~/components/Icons';
import { notificationServices } from '~/services';
import NotificationList from '~/components/Popper/Notification';

const cx = classNames.bind(styles);

const { REGIONS } = localizationConstants;
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: t('MenuActions.DisplayLanguage'),
    children: {
      title: t('Languages'),
      data: [
        {
          type: 'language',
          key: REGIONS.vi.key,
          title: t(REGIONS.vi.name),
          leftImg: REGIONS.vi.flag,
          flag: true,
        },
        {
          type: 'language',
          key: REGIONS.en.key,
          title: t(REGIONS.en.name),
          leftImg: REGIONS.en.flag,
          flag: true,
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: t('MenuActions.Help'),
    to: '/help',
  },
];
const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: t('MenuActions.ViewProfile'),
    to: '/profile',
  },
  {
    icon: <FontAwesomeIcon icon={faChartLine} />,
    title: t('MenuActions.FileManager'),
    to: '/manager',
  },
  ...MENU_ITEMS,
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: t('MenuActions.LogOut'),
    separate: true,
    type: 'logout',
  },
];

function Header() {
  const [notifications, setNotifications] = useState([]);

  const currentUser = !!cookies.getItem('token') ? JSON.parse(localStorage.getItem('currentUser')) : null;

  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        // Handle change language
        localizationHelpers.changeLanguage(menuItem.key);
        break;
      case 'logout':
        // Handle user logout
        Modal.confirm({
          title: t('Warning.ConfirmLogout'),
          okText: t('Actions.Confirm'),
          cancelText: t('Actions.Cancel'),
          okType: 'primary',
          onOk: () => {
            cookies.removeItem('token');
            localStorage.setItem('currentUser', JSON.stringify(null));
            browserHistory.push("/");
            window.location.reload();
          },
        });
        break;
      default:
    }
  };

  const getListNoti = async () => {
    const data = await notificationServices.getListNotifications();
    setNotifications(data);
  }

  useEffect(() => {
    if(!!currentUser){
      getListNoti();
    }
  }, []);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link className={cx('page-name')} to="/">
          <img className={cx('logo-fit')} src={images.logo} alt="FIT" />
          <h2 className={cx('name-page')}>KLTN</h2>
        </Link>
        <Search />
        <div className={cx('actions')}>
          {!!currentUser ? (
            <>
              <Tippy delay={[0, 10]} content={t('HeaderActions.UploadFile')} placement="bottom">
                <Link to="/upload">
                  <button className={cx('action-btn')}>
                    <UploadIcon />
                  </button>
                </Link>
              </Tippy>
              {/*<Tippy delay={[0, 50]} content={t('HeaderActions.Message')} placement="bottom">*/}
              {/*  <button className={cx('action-btn')}>*/}
              {/*    <MessageIcon />*/}
              {/*    <span className={cx('badge')}>2</span>*/}
              {/*  </button>*/}
              {/*</Tippy>*/}
              <Tippy delay={[0, 10]} content={t('HeaderActions.Notification')} placement="bottom">
                <NotificationList items={notifications} placement="bottom">
                  <button className={cx('action-btn')}>
                    <NotificationIcon />
                    {notifications.length > 0 ? (
                        <span className={cx('badge')}>{notifications.length}</span>
                      )
                      : (<></>)
                    }
                  </button>
                </NotificationList>
              </Tippy>
            </>
          ) : (
            <Link to="/login">
              <Button primary>{t('MenuActions.LogIn')}</Button>
            </Link>
          )}

          <Menu items={!!currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {!!currentUser ? (
              <Image
                className={cx('user-avatar')}
                src={currentUser.avatarUrl ? currentUser.avatarUrl : images.logo}
                alt={currentUser.name}
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
