import classNames from 'classnames/bind';
import DocViewer from 'react-doc-viewer';
import { useLocation } from 'react-router-dom';
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
  const { state } = useLocation();
  let fileDetail = state.file;
  let imageDetail;

  switch (fileDetail.type) {
    case 'pdf':
      imageDetail = images.pdf;
      break;
    case 'docx':
      imageDetail = images.docx;
      break;
    case 'pptx':
      imageDetail = images.pptx;
      break;
    default:
      imageDetail = images.pdf;
  }

  const category = localStorage.getItem(LOCALIZATION) === REGIONS.vi.key ? fileDetail.categoryVi : fileDetail.categoryEn

  const file_path = [
    { uri: require(`../../../../data/minio/${fileDetail.filePath}`) }, // Local File
  ];

  return (
    <>
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
        </div>
      </div>
      <DocViewer documents={file_path} style={{ width: 500, height: 500 }} />
    </>
  );
}

export default DocumentDetail;
