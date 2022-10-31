import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Image, Table } from 'antd';
import { t } from '~/helpers/i18n';
import { fileServices } from '~/services';

const cx = classNames.bind(styles);

const Profile = () => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const getStatisticFile = async () => {
    const file_list = await fileServices.getStatisticFile();
    setFiles(file_list)
    // Chart
    setData([
      {
        type: t('FileStatus.Processing'),
        value: filterFile(file_list,0),
      },
      {
        type: t('FileStatus.Draft'),
        value: filterFile(file_list,1),
      },
      {
        type: t('FileStatus.Approved'),
        value: filterFile(file_list,3),
      },
      {
        type: t('FileStatus.Refuse'),
        value: filterFile(file_list,2),
      },
      {
        type: t('FileStatus.Delete'),
        value: filterFile(file_list,-1),
      },
      {
        type: t('FileStatus.Liked'),
        value: filterFile(file_list,5),
      },
      {
        type: t('FileStatus.Shared'),
        value: filterFile(file_list,6),
      },
    ]);
  }

  useEffect(() => {
    if(!!currentUser){
      getStatisticFile();
    }
  }, []);

  const filterFile = (file_list, status) => {
    let file = file_list.filter(file => {
      return file.status === status
    });
    if (!!file && file.length > 0){
      return file[0].total
    }
    return 0
  }

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
            <div>{t('Profile.TotalFiles')}: {filterFile(files,4)}</div>
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
