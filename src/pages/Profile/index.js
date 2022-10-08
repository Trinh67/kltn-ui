import React from 'react';
import { Pie } from '@ant-design/plots';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Image, Table } from 'antd';
import { t } from '~/helpers/i18n';

const cx = classNames.bind(styles);

const Profile = () => {
  // Chart
  const data = [
    {
      type: t('FileStatus.Processing'),
      value: 17,
    },
    {
      type: t('FileStatus.Draft'),
      value: 15,
    },
    {
      type: t('FileStatus.Approved'),
      value: 18,
    },
    {
      type: t('FileStatus.Refuse'),
      value: 15,
    },
    {
      type: t('FileStatus.Delete'),
      value: 3,
    },
    {
      type: t('FileStatus.Liked'),
      value: 10,
    },
    {
      type: t('FileStatus.Shared'),
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

  // Profile
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const dataSource = [
    {
      key: '1',
      attribute: t('Profile.Name'),
      information: currentUser.name,
    },
    {
      key: '2',
      attribute: 'Email',
      information: currentUser.email,
    },
    {
      key: '3',
      attribute: t('Profile.Avatar'),
      information: <Image
        width={200}
        src={currentUser.avatarUrl}
      />,
    },
  ];

  const columns = [
    {
      title: t('Profile.Attribute'),
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: t('Profile.Information'),
      dataIndex: 'information',
      key: 'information',
    },
  ];

  return (
    <>
      <div className={cx('wrapper')}>
        <div style={{display: 'flex', width: '100%'}}>
          <div className={cx('chart')}>
            <Pie {...config} />
          </div>
          <div className={cx('profile')}>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </div>
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: '2rem',
        width: '100%',
        fontWeight: 'bold',
        position: 'fixed',
        bottom: '20px',
      }}>
        University of Engineering and Technology
      </div>
    </>
  );
};

export default Profile;
