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
  getItem('Toán', 'sub1', <CalculatorOutlined />, [
    getItem('Đại số', '1'),
    getItem('Giải tích', 'sub2', null, [getItem('Giải tích 1', '2'), getItem('Giải tích 2', '3')]),
    getItem('Toán rời rạc', '4'),
    getItem('Xác suất thống kê', '5'),
  ]),
  getItem('Giải thuật', 'sub3', <AppstoreOutlined />, [
    getItem('Nhập môn lập trình', '6'),
    getItem('Lập trình nâng cao', '7'),
    getItem('Lập trình hướng đối tượng', '8'),
  ]),
  getItem('Dữ liệu', 'sub4', <DatabaseOutlined />, [
    getItem('Cơ sơ dữ liệu', '9'),
    getItem('Hệ quản trị Cơ sơ dữ liệu', '10'),
    getItem('Kho dữ liệu', '11'),
    getItem('Khai phá dữ liệu', '12'),
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
        mode='inline'
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