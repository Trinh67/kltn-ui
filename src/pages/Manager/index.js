import classNames from 'classnames/bind';
import { Menu, Button, Table, Tag, Modal, Space } from 'antd';
import { useState, useEffect } from 'react';
import {
  CloudUploadOutlined,
  LikeOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  DislikeOutlined,
  Loading3QuartersOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';

import { t } from '~/helpers/i18n';
import { fileServices } from '~/services';
import styles from './Manager.module.scss';

const cx = classNames.bind(styles);

const adminTabs = [
  {
    label: 'Tệp đang xử lí',
    key: 'processing',
    icon: <Loading3QuartersOutlined />,
  },
  {
    label: 'Tệp chờ duyệt',
    key: 'draft',
    icon: <CloudSyncOutlined />,
  },
  {
    label: 'Tệp đã từ chối duyệt',
    key: 'refuse',
    icon: <DislikeOutlined />,
  },
  {
    label: 'Tệp đã duyệt',
    key: 'approved',
    icon: <LikeOutlined />,
  },
];
const guestTabs = [
  {
    label: 'Tệp đã tải lên',
    key: 'uploaded',
    icon: <CloudUploadOutlined />,
  },
  {
    label: 'Tệp yêu thích',
    key: 'favorite',
    icon: <LikeOutlined />,
  },
  {
    label: 'Tệp được chia sẻ',
    key: 'share',
    icon: <ShareAltOutlined />,
  },
];

const FileManager = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [current, setCurrent] = useState('uploaded');
  const [colums, setColums] = useState(null);

  const [page, setPage] = useState(1);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const [files, setFiles] = useState([]);

  const initial = async (key) => {
    console.log(key);
    switch (current) {
      case 'uploaded':
        setColums(uploadedColumns);
        break;
      case 'favorite':
        setColums(favoriteColumns);
        break;
      case 'share':
        setColums(sharedColumns);
        break;
      case 'processing':
        setColums(processingColumns);
        break;
      case 'draft':
        setColums(draftColumns);
        break;
      case 'refuse':
        setColums(refuseColumns);
        break;
      case 'approved':
        setColums(approvedColumns);
        break;
      default:
        setColums(uploadedColumns);
        break;
    }
    const result = await fileServices.getFiles();
    setFiles(result.data.files);
  };

  useEffect(() => {
    if (currentUser.email === 'trinhxuantrinh.yd267@gmail.com') {
      setCurrent('processing');
    }
    initial(current);
  }, []);

  useEffect(() => {
    setPage(1);
    initial(current);
  }, [current]);

  useEffect(() => {
    initial(current);
  }, [page]);

  const DeleteFile = async (id) => {
    // Handle user delete file
    Modal.confirm({
      title: t('Warning.ConfirmDeleteFile'),
      okText: t('Actions.Confirm'),
      cancelText: t('Actions.Cancel'),
      okType: 'primary',
      onOk: () => {
        console.log(id);
      },
    });
  };

  const DislikeFile = async (id) => {
    // Handle user dislike file
    Modal.confirm({
      title: t('Warning.ConfirmDislikeFile'),
      okText: t('Actions.Confirm'),
      cancelText: t('Actions.Cancel'),
      okType: 'primary',
      onOk: () => {
        console.log(id);
      },
    });
  };

  const ApprovedFile = async (id) => {
    // Handle user approved document
    Modal.confirm({
      title: t('Warning.ConfirmApprovedFile'),
      okText: t('Actions.Confirm'),
      cancelText: t('Actions.Cancel'),
      okType: 'primary',
      onOk: () => {
        console.log(id);
      },
    });
  };

  const RefuseFile = async (id) => {
    // Handle user delete file
    Modal.confirm({
      title: t('Warning.ConfirmRefuseFile'),
      okText: t('Actions.Confirm'),
      cancelText: t('Actions.Cancel'),
      okType: 'primary',
      onOk: () => {
        console.log(id);
      },
    });
  };

  const uploadedColumns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryVi',
      key: 'categoryVi',
      width: '20%',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = 'processing';
        }
        if (status === 1) {
          color = 'geekblue';
          text = 'Wait to approve';
        }
        if (status === 2) {
          color = 'volcano';
          text = 'Refuse approved';
        }
        if (status === 3) {
          color = 'success';
          text = 'Approved';
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (value, item) => (
        <Button
          type="danger"
          shape="round"
          icon={<DeleteOutlined />}
          onClick={(e) => DeleteFile(item.id)}
          size="default"
        >
          Xóa tệp
        </Button>
      ),
    },
  ];

  const favoriteColumns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryVi',
      key: 'categoryVi',
      width: '15%',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = 'processing';
        }
        if (status === 1) {
          color = 'geekblue';
          text = 'Wait to approve';
        }
        if (status === 2) {
          color = 'volcano';
          text = 'Refuse approved';
        }
        if (status === 3) {
          color = 'success';
          text = 'Approved';
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (value, item) => (
        <Button
          type="danger"
          shape="round"
          icon={<DeleteOutlined />}
          onClick={(e) => DislikeFile(item.id)}
          size="default"
        >
          Bỏ thích
        </Button>
      ),
    },
  ];

  const sharedColumns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '15%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryVi',
      key: 'categoryVi',
      width: '20%',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = 'processing';
        }
        if (status === 1) {
          color = 'geekblue';
          text = 'Wait to approve';
        }
        if (status === 2) {
          color = 'volcano';
          text = 'Refuse approved';
        }
        if (status === 3) {
          color = 'success';
          text = 'Approved';
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const processingColumns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '15%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryVi',
      key: 'categoryVi',
      width: '20%',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = 'processing';
        }
        if (status === 1) {
          color = 'geekblue';
          text = 'Wait to approve';
        }
        if (status === 2) {
          color = 'volcano';
          text = 'Refuse approved';
        }
        if (status === 3) {
          color = 'success';
          text = 'Approved';
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const draftColumns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryVi',
      key: 'categoryVi',
      width: '15%',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = 'processing';
        }
        if (status === 1) {
          color = 'geekblue';
          text = 'Wait to approve';
        }
        if (status === 2) {
          color = 'volcano';
          text = 'Refuse approved';
        }
        if (status === 3) {
          color = 'success';
          text = 'Approved';
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '25%',
      align: 'center',
      render: (value, item) => (
        <Space>
          <Button
            type="primary"
            shape="round"
            icon={<LikeOutlined />}
            onClick={(e) => ApprovedFile(item.id)}
            size="default"
          >
            Chấp nhận
          </Button>
          <Button
            type="danger"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={(e) => RefuseFile(item.id)}
            size="default"
          >
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  const refuseColumns = uploadedColumns;

  const approvedColumns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '15%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryVi',
      key: 'categoryVi',
      width: '15%',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = 'processing';
        }
        if (status === 1) {
          color = 'geekblue';
          text = 'Wait to approve';
        }
        if (status === 2) {
          color = 'volcano';
          text = 'Refuse approved';
        }
        if (status === 3) {
          color = 'success';
          text = 'Approved';
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={currentUser.email === 'trinhxuantrinh.yd267@gmail.com' ? adminTabs : guestTabs}
        style={{ justifyContent: 'center', fontSize: '1.6rem' }}
      />
      <Table
        columns={colums}
        dataSource={files}
        rowKey="id"
        pagination={{
          onChange(page_num) {
            setPage(page_num);
          },
        }}
        scroll={{
          x: 1300,
          y: 500,
        }}
      />
      <div
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          width: '100%',
          fontWeight: 'bold',
          position: 'fixed',
          bottom: '20px',
        }}
      >
        University of Engineering and Technology
      </div>
    </>
  );
};

export default FileManager;
