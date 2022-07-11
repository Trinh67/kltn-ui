import React from 'react';
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
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { NotificationIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { t } from '~/helpers/i18n';
import localizationHelpers from '~/helpers/localization';
import localizationConstants from '~/constants/localization';

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
                    flag: true
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

function Header() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                localizationHelpers.changeLanguage(menuItem.key)
                break;
            default:
        }
    };

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
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('page-name')} to="/">
                    <img className={cx('logo-fit')} src={images.logo} alt="FIT" />
                    <h2 className={cx('name-page')}>KLTN</h2>
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content={t('HeaderActions.UploadFile')} placement="bottom">
                                <Link to="/upload">
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Link>
                            </Tippy>
                            <Tippy delay={[0, 50]} content={t('HeaderActions.Message')} placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                    <span className={cx('badge')}>2</span>
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content={t('HeaderActions.Notification')} placement="bottom">
                                <button className={cx('action-btn')}>
                                    <NotificationIcon />
                                    <span className={cx('badge')}>5</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Link to='/login'><Button primary>{t('MenuActions.LogIn')}</Button></Link>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src={currentUser.imageUrl ? currentUser.imageUrl : images.logo}
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
