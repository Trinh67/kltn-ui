import { faEye, faUser, faCalendarCheck, faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './DocumentInList.module.scss';

const cx = classNames.bind(styles);

function DocumentInList(file) {
    const fileDetail = file.file
    let imageDetail

    switch (fileDetail.type) {
        case 'pdf':
            imageDetail = images.pdf
            break;
        case 'docx':
            imageDetail = images.docx
            break;
        case 'pptx':
            imageDetail = images.pptx
            break;
        default:
            imageDetail = images.pdf
    }
    
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('img-document')}
                src={images.logo}
                alt="img-document"
            />
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <span>{fileDetail.fileName}</span>
                </h4>
                <span className={cx('short-content')}>{fileDetail.fileDescription}</span>
                <div className={cx('statistic')}>
                    <Image
                        className={cx('type-document')}
                        src={imageDetail}
                        alt="type-document"
                    />
                    <div className={cx('pages')}> {fileDetail.pages} {t('Pages')} </div>
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
                </div>
            </div>
        </div>
    );
}

export default DocumentInList;
