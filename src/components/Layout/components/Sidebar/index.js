import React, { useState } from 'react';
import { Menu } from 'antd';
import { CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { t } from '~/helpers/i18n';

const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(t('Category.Math'), 'sub1', <CalculatorOutlined />, [
    getItem(t('Category.Algebra'), '2'),
    // getItem('Giải tích', 'sub2', null, [getItem('Giải tích 1', '3'), getItem('Giải tích 2', '3')]),
    getItem(t('Category.Calculus'), '3'),
    getItem(t('Category.DiscreteMathematics'), '4')
  ]),
  getItem(t('Category.DataStructuresAlgorithms'), '5'),
  getItem(t('Category.Data'), 'sub3', <DatabaseOutlined />, [
    getItem(t('Category.Database'), '6'),
    getItem(t('Category.DataWarehouse'), '7')
  ]),
  getItem(t('Category.Other'), '12'),
]; // submenu keys of first level

const rootSubmenuKeys = ['sub1', 'sub3'];

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const searchFile = (keys) => {
    localStorage.setItem('category', keys.key);
    window.location.reload();
  }

  return (
    <div className={cx('wrapper')}>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 228,
        }}
        items={items}
        onClick={searchFile}
      />
    </div>
  );
};

export default Sidebar;