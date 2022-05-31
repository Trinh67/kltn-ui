import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

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
  getItem('Math', 'sub1', <CalculatorOutlined />, [
    getItem('Algebra', '1'),
    getItem('Calculus', 'sub2', null, [getItem('Calculus 1', '2'), getItem('Calculus 2', '3')]),
    getItem('Discrrete Mathematics', '4'),
    getItem('Probability and Statistics', '5'),
  ]),
  getItem('Algorithm', 'sub3', <AppstoreOutlined />, [
    getItem('Introduction Programming', '6'),
    getItem('Advanced Programming', '7'),
    getItem('Object-oriented Programming', '8'),
  ]),
  getItem('Database', 'sub4', <DatabaseOutlined />, [
    getItem('Database', '9'),
    getItem('Database Management Systems', '10'),
    getItem('Data Warehouse', '11'),
    getItem('Data Mining', '12'),
  ]),
]; // submenu keys of first level

const rootSubmenuKeys = ['sub1', 'sub3', 'sub4'];

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

  return (
    <div className={cx('wrapper')}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 228,
        }}
        items={items}
      />
    </div>
  );
};

export default Sidebar;