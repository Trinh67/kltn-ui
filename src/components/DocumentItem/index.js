import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './DocumentItem.module.scss';

const cx = classNames.bind(styles);

function DocumentItem() {
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
                    <div className={cx('views')}>
                        <FontAwesomeIcon icon={faEye} />
                        <span> 15 </span>
                    </div>
                </h4>
                <span className={cx('short-content')}>Short content ....</span>
            </div>
        </div>
    );
}

export default DocumentItem;
