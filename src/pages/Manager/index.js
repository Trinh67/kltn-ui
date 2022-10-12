import classNames from 'classnames/bind';
import { Menu, Button, Table, Tag, Modal, Space, Input, Tooltip, Select } from 'antd';
import { useState, useEffect } from 'react';
import {
  CloudUploadOutlined,
  LikeOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  DislikeOutlined,
  Loading3QuartersOutlined,
  CloudSyncOutlined,
  CloseCircleOutlined,
  SendOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

import { t } from '~/helpers/i18n';
import { fileServices, userServices } from '~/services';
import styles from './Manager.module.scss';
import { CustomModal } from '~/components/Modal';
import localStorageConstants from '~/constants/localStorage';
import localizationConstants from '~/constants/localization';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

const cx = classNames.bind(styles);
const { Option } = Select;

const adminTabs = [
  {
    label: t('TabTitle.Processing'),
    key: 'processing',
    icon: <Loading3QuartersOutlined />,
  },
  {
    label: t('TabTitle.Draft'),
    key: 'draft',
    icon: <CloudSyncOutlined />,
  },
  {
    label: t('TabTitle.Refuse'),
    key: 'refuse',
    icon: <DislikeOutlined />,
  },
  {
    label: t('TabTitle.Approved'),
    key: 'approved',
    icon: <LikeOutlined />,
  },
];
const guestTabs = [
  {
    label: t('TabTitle.Uploaded'),
    key: 'uploaded',
    icon: <CloudUploadOutlined />,
  },
  {
    label: t('TabTitle.Liked'),
    key: 'favorite',
    icon: <LikeOutlined />,
  },
  {
    label: t('TabTitle.Shared'),
    key: 'share',
    icon: <ShareAltOutlined />,
  },
];

const FileManager = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [current, setCurrent] = useState(null);
  const [columns, setColumns] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [fileId, setFieldId] = useState(null);

  // Modal Approve
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const [googleDriverId, setGoogleDriverId] = useState('');
  // Modal Refuse
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [refuseReason, setRefuseReason] = useState('');
  // Modal Share
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFieldId, setShareFieldId] = useState('');
  const [shareToUserId, setShareToUserId] = useState([]);

  const [page, setPage] = useState(1);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const [files, setFiles] = useState([]);
  const [children, setChildren] = useState([]);

  // Logic Share Modal
  const initUserList = async () => {
    let list_user = await userServices.getListUsers();
    let listOptions = [];
    for (let i = 0; i < list_user.length; i++) {
      let item = list_user[i];
      listOptions.push(<Option key={i} value={item.userId}>{item.email}</Option>);
    }
    setChildren(listOptions)
  }

  const initial = async (key) => {
    let type = null;
    switch (current) {
      case 'processing':
        type = 0;
        setColumns(processingColumns);
        break;
      case 'draft':
        type = 1;
        setColumns(draftColumns);
        break;
      case 'refuse':
        type = 2;
        setColumns(refuseColumns);
        break;
      case 'approved':
        type = 3;
        setColumns(approvedColumns);
        break;
      case 'uploaded':
        type = 4;
        setColumns(uploadedColumns);
        break;
      case 'favorite':
        type = 5;
        setColumns(favoriteColumns);
        break;
      case 'share':
        type = 6;
        setColumns(sharedColumns);
        break;
      default:
        type = 4;
        setColumns(uploadedColumns);
        break;
    }
    const result = await fileServices.filterFiles(type);
    if (type == 4){
      for (var i = 0; i < result.data.files.length; i++){
        let file = result.data.files[i];
        if (file.status == 3){
          let emails = await fileServices.getListSharedEmail({"fileId": file.id});
          if (emails.length > 0){
            file.refuseReason = `${t('Tooltip.SharedWith')}: ${emails}`.replace(',', ' / ');
          } else file.refuseReason = t('Tooltip.NotShared')
        }
      }
    }
    setFiles(result.data.files);
  };

  const reloadComponent = () => {
    initial(current);
  };

  useEffect(() => {
    if (currentUser.email === 'trinhxuantrinh.yd267@gmail.com') {
      setCurrent('processing');
    } else setCurrent('uploaded');
    if (!firstLoad) {
      setPage(1);
      initial(current);
    }
    initUserList();
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      setPage(1);
      initial(current);
    }
  }, [current]);

  useEffect(() => {
    if (!firstLoad) {
      initial(current);
    }
  }, [page]);

  const DeleteFile = async (id) => {
    // Handle user delete file
    Modal.confirm({
      title: t('Warning.ConfirmDeleteFile'),
      okText: t('Actions.Confirm'),
      cancelText: t('Actions.Cancel'),
      okType: 'primary',
      onOk: () => {
        fileServices.updateStatusFile({ 'id': id, 'type': -1 });
        setTimeout(reloadComponent, 1200);
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
        fileServices.actionFile({ 'id': id, 'type': 0 });
        setTimeout(reloadComponent, 1000);
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
        setFieldId(id);
        setShowApprovedModal(true);
      },
    });
  };

  const RefuseFile = async (id) => {
    // Handle user refuse file
    Modal.confirm({
      title: t('Warning.ConfirmRefuseFile'),
      okText: t('Actions.Confirm'),
      cancelText: t('Actions.Cancel'),
      okType: 'primary',
      onOk: () => {
        setFieldId(id);
        setShowRefuseModal(true);
      },
    });
  };

  const ShareFile = (id) => {
    setShareFieldId(id);
    setShowShareModal(true);
  };

  const uploadedColumns = [
    {
      title: t('TableTitle.STT'),
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: t('TableTitle.Title'),
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Author'),
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Category'),
      dataIndex: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      key: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      width: '20%',
    },
    {
      title: t('TableTitle.DateUpload'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: t('TableTitle.Status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (value, item) => {
        let color, text;
        if (item.status === 0) {
          color = 'warning';
          text = t('FileStatus.Processing');
        }
        if (item.status === 1) {
          color = 'geekblue';
          text = t('FileStatus.Draft');
        }
        if (item.status === 2) {
          color = 'volcano';
          text = t('FileStatus.Refuse');
        }
        if (item.status === 3) {
          color = 'success';
          text = t('FileStatus.Approved');
        }

        return (
          <>
            <Tag color={color} key={item.status} style={{ fontWeight: 'bold' }}>
              {text.toUpperCase()}
            </Tag>
            {item.status === 2 ? (
              <Tooltip title={item.refuseReason}>
                <QuestionCircleOutlined />
              </Tooltip>
            ) : (<></>)}
          </>
        );
      },
    },
    {
      title: t('TableTitle.Action'),
      key: 'action',
      width: '10%',
      align: 'center',
      render: (value, item) => {
        return (
          <>
            {item.status <= 2 ? (
              <Button
                disabled={item.status > 2}
                type='danger'
                shape='round'
                icon={<DeleteOutlined />}
                onClick={(e) => DeleteFile(item.id)}
                size='default'
              >
                {t('Actions.Delete')}
              </Button>
            ) : (<></>)}
            {item.status == 3 ? (
              <>
                <Button
                  type='primary'
                  shape='round'
                  icon={<ShareAltOutlined />}
                  onClick={(e) => ShareFile(item.id)}
                  size='default'
                >
                  {t('Actions.Share')}
                </Button>
                <Tooltip placement="left" title={item.refuseReason}>
                  <InfoCircleOutlined />
                </Tooltip>
              </>
            ) : (<></>)}
          </>)
      },
    },
  ];

  const favoriteColumns = [
    {
      title: t('TableTitle.STT'),
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: t('TableTitle.Title'),
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Author'),
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Category'),
      dataIndex: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      key: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      width: '15%',
    },
    {
      title: t('TableTitle.DateUpload'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: t('TableTitle.Status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = t('FileStatus.Processing');
        }
        if (status === 1) {
          color = 'geekblue';
          text = t('FileStatus.Draft');
        }
        if (status === 2) {
          color = 'volcano';
          text = t('FileStatus.Refuse');
        }
        if (status === 3) {
          color = 'success';
          text = t('FileStatus.Approved');
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: t('TableTitle.Action'),
      key: 'action',
      width: '10%',
      align: 'center',
      render: (value, item) => (
        <Button
          type='danger'
          shape='round'
          icon={<DeleteOutlined />}
          onClick={(e) => DislikeFile(item.id)}
          size='default'
        >
          Bỏ thích
        </Button>
      ),
    },
  ];

  const sharedColumns = [
    {
      title: t('TableTitle.STT'),
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: t('TableTitle.Title'),
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Author'),
      dataIndex: 'authorName',
      key: 'authorName',
      width: '15%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Category'),
      dataIndex: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      key: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      width: '20%',
    },
    {
      title: t('TableTitle.DateUpload'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: t('TableTitle.Status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = t('FileStatus.Processing');
        }
        if (status === 1) {
          color = 'geekblue';
          text = t('FileStatus.Draft');
        }
        if (status === 2) {
          color = 'volcano';
          text = t('FileStatus.Refuse');
        }
        if (status === 3) {
          color = 'success';
          text = t('FileStatus.Approved');
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
      title: t('TableTitle.STT'),
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: t('TableTitle.Title'),
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Author'),
      dataIndex: 'authorName',
      key: 'authorName',
      width: '15%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Category'),
      dataIndex: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      key: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      width: '20%',
    },
    {
      title: t('TableTitle.DateUpload'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: t('TableTitle.Status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = t('FileStatus.Processing');
        }
        if (status === 1) {
          color = 'geekblue';
          text = t('FileStatus.Draft');
        }
        if (status === 2) {
          color = 'volcano';
          text = t('FileStatus.Refuse');
        }
        if (status === 3) {
          color = 'success';
          text = t('FileStatus.Approved');
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
      title: t('TableTitle.STT'),
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: t('TableTitle.Title'),
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Author'),
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Category'),
      dataIndex: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      key: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      width: '15%',
    },
    {
      title: t('TableTitle.DateUpload'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '15%',
      align: 'center',
    },
    {
      title: t('TableTitle.Status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = 'warning';
          text = t('FileStatus.Processing');
        }
        if (status === 1) {
          color = 'geekblue';
          text = t('FileStatus.Draft');
        }
        if (status === 2) {
          color = 'volcano';
          text = t('FileStatus.Refuse');
        }
        if (status === 3) {
          color = 'success';
          text = t('FileStatus.Approved');
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: t('TableTitle.Action'),
      key: 'action',
      width: '25%',
      align: 'center',
      render: (value, item) => (
        <Space>
          <Button
            type='primary'
            shape='round'
            icon={<LikeOutlined />}
            onClick={(e) => ApprovedFile(item.id)}
            size='default'
          >
            Chấp nhận
          </Button>
          <Button
            type='danger'
            shape='round'
            icon={<DeleteOutlined />}
            onClick={(e) => RefuseFile(item.id)}
            size='default'
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
      title: t('TableTitle.STT'),
      key: 'index',
      width: '5%',
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: t('TableTitle.Title'),
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Author'),
      dataIndex: 'authorName',
      key: 'authorName',
      width: '15%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('TableTitle.Category'),
      dataIndex: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      key: localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? 'categoryVi' : 'categoryEn',
      width: '15%',
    },
    {
      title: t('TableTitle.DateUpload'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: t('TableTitle.Status'),
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
          text = t('FileStatus.Draft');
        }
        if (status === 2) {
          color = 'volcano';
          text = t('FileStatus.Refuse');
        }
        if (status === 3) {
          color = 'success';
          text = t('FileStatus.Approved');
        }

        return (
          <Tag color={color} key={status} style={{ fontWeight: 'bold' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  // Modal Approve function
  const handleApprovedSubmit = () => {
    console.log(googleDriverId);
    fileServices.updateStatusFile({ 'id': fileId, 'type': 3, 'googleDriverId': googleDriverId });
    setTimeout(reloadComponent, 1000);
    setGoogleDriverId('');
    setShowApprovedModal(false);
  };
  const handleApprovedClose = () => {
    setRefuseReason('');
    setShowApprovedModal(false);
  };
  // Modal Refuse function
  const handleRefuseSubmit = () => {
    console.log(refuseReason);
    fileServices.updateStatusFile({ 'id': fileId, 'type': 2, 'refuseReason': refuseReason });
    setTimeout(reloadComponent, 1000);
    setRefuseReason('');
    setShowRefuseModal(false);
  };
  const handleRefuseClose = () => {
    setRefuseReason('');
    setShowRefuseModal(false);
  };
  // Modal Share function
  const handleShareSubmit = () => {
    console.log(shareToUserId);
    fileServices.actionFile({ 'id': shareFieldId, 'type': 3, 'shareToUserId': shareToUserId });
    setTimeout(reloadComponent, 1000);
    setShareFieldId('');
    setShareToUserId('');
    setShowShareModal(false);
  };
  const handleShareClose = () => {
    setShareFieldId('');
    setShareToUserId('');
    setShowShareModal(false);
  };
  const handleShareChange = (value) => {
    setShareToUserId(value)
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={currentUser.email === 'trinhxuantrinh.yd267@gmail.com' ? adminTabs : guestTabs}
        style={{ justifyContent: 'center', fontSize: '1.6rem' }}
      />
      <CustomModal show={showApprovedModal}>
        <div className={cx('modal-header')}>{t('Modal.ApproveDocument')}</div>
        <div className={cx('modal-body')}>
          <label>{t('Modal.GoogleDriverId')}</label>
          <Input placeholder={t('Modal.EnterGoogleDriverId')} onChange={e => setGoogleDriverId(e.target.value)} />
        </div>
        <div className={cx('modal-footer')}>
          <Button onClick={handleApprovedClose} type='default' icon={<CloseCircleOutlined />}>
            {t('Actions.Cancel')}
          </Button>
          <Button onClick={handleApprovedSubmit} type='primary' icon={<SendOutlined />}>
            {t('Actions.Confirm')}
          </Button>
        </div>
      </CustomModal>
      <CustomModal show={showRefuseModal}>
        <div className={cx('modal-header')}>{t('Modal.RefuseDocument')}</div>
        <div className={cx('modal-body')}>
          <label>{t('Modal.Reason')}</label>
          <Input placeholder={t('Modal.EnterReason')} onChange={e => setRefuseReason(e.target.value)} />
        </div>
        <div className={cx('modal-footer')}>
          <Button onClick={handleRefuseClose} type='default' icon={<CloseCircleOutlined />}>
            {t('Actions.Cancel')}
          </Button>
          <Button onClick={handleRefuseSubmit} type='primary' icon={<SendOutlined />}>
            {t('Actions.Confirm')}
          </Button>
        </div>
      </CustomModal>
      <CustomModal show={showShareModal}>
        <div className={cx('modal-header')}>{t('Modal.ShareDocument')}</div>
        <div className={cx('modal-body')}>
          <label>{t('Modal.Share')}</label>
          <Select
            mode='multiple'
            showSearch
            style={{ width: '100%' }}
            allowClear
            placeholder={t('Modal.EnterShare')}
            onChange={handleShareChange}
          >
            {children}
          </Select>
        </div>
        <div className={cx('modal-footer')}>
          <Button onClick={handleShareClose} type='default' icon={<CloseCircleOutlined />}>
            {t('Actions.Cancel')}
          </Button>
          <Button onClick={handleShareSubmit} type='primary' icon={<SendOutlined />}>
            {t('Actions.Confirm')}
          </Button>
        </div>
      </CustomModal>
      <Table
        columns={columns}
        dataSource={files}
        rowKey='id'
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
