import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faCalendarCheck, faCircleDown, faListAlt } from '@fortawesome/free-regular-svg-icons';

import { t } from 'i18next';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './DocumentInList.module.scss';
import localStorageConstants from '~/constants/localStorage';
import localizationConstants from '~/constants/localization';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

const cx = classNames.bind(styles);

function DocumentInList(file) {
  let navigate = useNavigate();

  const fileDetail = file.file;
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

  const handleDocumentClick = () => {
    navigate('/document/detail', { state: file });
  };

  return (
    <div className={cx('wrapper')} onClick={handleDocumentClick}>
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
  );
}

export default DocumentInList;
