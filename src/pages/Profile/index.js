import React from 'react';
import { Pie } from '@ant-design/plots';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Profile = () => {
    const data = [
        {
            type: 'Đang xử lí',
            value: 17,
        },
        {
            type: 'Đợi duỵệt',
            value: 15,
        },
        {
            type: 'Đã duyệt',
            value: 18,
        },
        {
            type: 'Bị Từ chối',
            value: 15,
        },
        {
            type: 'Bị xóa',
            value: 3,
        },
        {
            type: 'Đã thích',
            value: 10,
        },
        {
            type: 'Được chia sẻ',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return (
      <>
        <div className={cx('wrapper')}>
            <Pie {...config} />
        </div>
      </>
    );
};

export default Profile;
