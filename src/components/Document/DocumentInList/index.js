import { faEye, faUser, faCalendarCheck, faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './DocumentInList.module.scss';

const cx = classNames.bind(styles);

function DocumentInList() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('img-document')}
                src={images.noImage}
                alt="img-document"
            />
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <span>Title document .....</span>
                </h4>
                <span className={cx('short-content')}>Sự bùng nổ về cuộc cách mạng 4.0 đã khiến cụm từ Interner Of Things hay vạn vật kết nối internet trở nên không còn quá xa lạ với nhiều người....</span>
                <div className={cx('statistic')}>
                    <Image
                        className={cx('type-document')}
                        src={images.pdf}
                        alt="type-document"
                    />
                    <div className={cx('pages')}> 29 {t('Pages')} </div>
                    <div className={cx('views')}>
                        <FontAwesomeIcon icon={faEye} />
                        <span> 15 </span>
                    </div>
                    <div className={cx('author')}>
                        <FontAwesomeIcon icon={faUser} />
                        <span> trinh.tx </span>
                    </div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        <span> 30/04/2022 </span>
                    </div>
                    <div className={cx('download')}>
                        <FontAwesomeIcon icon={faCircleDown} />
                        <span> 6 </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentInList;
