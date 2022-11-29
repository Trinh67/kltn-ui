import React, { useState } from 'react';
import { Menu } from 'antd';
import { CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';

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
  getItem('Toán', 'sub1', <CalculatorOutlined />, [
    getItem('Đại số', '2'),
    // getItem('Giải tích', 'sub2', null, [getItem('Giải tích 1', '3'), getItem('Giải tích 2', '3')]),
    getItem('Giải tích', '3'),
    getItem('Toán rời rạc', '4')
  ]),
  getItem('Cấu trúc dữ liệu & Giải thuật', '5'),
  getItem('Dữ liệu', 'sub3', <DatabaseOutlined />, [
    getItem('Cơ sơ dữ liệu', '6'),
    getItem('Kho dữ liệu', '7')
  ]),
  getItem('Khác', '12'),
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