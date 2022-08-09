import { useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faCalendarCheck, faCircleDown, faListAlt } from '@fortawesome/free-regular-svg-icons';

import { t } from 'i18next';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './DocumentDetail.module.scss';
import localStorageConstants from '~/constants/localStorage';
import localizationConstants from '~/constants/localization';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

const cx = classNames.bind(styles);

function DocumentDetail() {
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const { state } = useLocation();
  let fileDetail = state.file;
  let imageDetail, srcDocument, exportDocument;

  switch (fileDetail.type) {
    case 'pdf':
      imageDetail = images.pdf;
      srcDocument = 'https://drive.google.com/uc?id=' + fileDetail.googleDriverId;
      exportDocument = 'https://drive.google.com/uc?id=' + fileDetail.googleDriverId + '&export=download';
      break;
    case 'docx':
      imageDetail = images.docx;
      srcDocument = 'https://docs.google.com/document/u/2/d/' + fileDetail.googleDriverId + '/preview';
      exportDocument = 'https://docs.google.com/document/u/2/d/' + fileDetail.googleDriverId + '/export';
      break;
    case 'pptx':
      imageDetail = images.pptx;
      break;
    default:
      imageDetail = images.pdf;
  }

  const category =
    localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? fileDetail.categoryVi : fileDetail.categoryEn;

  const closeLoading = () => {
    setLoading(false);
  };

  const downloadFile = async () => {
    setDownloadLoading(true);
    await fetch(exportDocument);
    setDownloadLoading(false);
  };

  return (
    <>
      <Spin tip="Loading document..." spinning={loading}>
        <iframe
          title={fileDetail.fileTitle}
          onLoad={closeLoading}
          style={{ height: '76vh', width: '80%', marginLeft: '10%' }}
          src={srcDocument}
        />
      </Spin>
      <div className={cx('wrapper')}>
        <Image className={cx('img-document')} src={images.logo} alt="img-document" />
        <div className={cx('info')}>
          <h4 className={cx('title')}>
            <span>{fileDetail.fileTitle}</span>
          </h4>
          <span className={cx('short-content')}>{fileDetail.fileDescription}</span>
          <div className={cx('statistic')}>
            <Image className={cx('type-document')} src={imageDetail} alt="type-document" />
            <div className={cx('pages')}>
              {' '}
              {fileDetail.pages} {t('Pages')}{' '}
            </div>
            <div className={cx('views')}>
              <FontAwesomeIcon icon={faEye} />
              <span> {fileDetail.views} </span>
            </div>
            <div className={cx('author')}>
              <FontAwesomeIcon icon={faUser} />
              <span> {fileDetail.authorName} </span>
            </div>
            <div className={cx('time')}>
              <FontAwesomeIcon icon={faCalendarCheck} />
              <span> {fileDetail.updatedAt} </span>
            </div>
            <div className={cx('download')}>
              <FontAwesomeIcon icon={faCircleDown} />
              <span> {fileDetail.downloads} </span>
            </div>
            <div className={cx('category')}>
              <FontAwesomeIcon icon={faListAlt} />
              <span> {category} </span>
            </div>
          </div>
          <Button  loading={downloadLoading} href={exportDocument}>
            Download
          </Button>
        </div>
      </div>
    </>
  );
}

export default DocumentDetail;
