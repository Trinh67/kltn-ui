import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <h2>Toán cao cấp</h2>
            <h2>Giải tích</h2>
            <h2>Nhập môn lập trình</h2>
            <h2>Lập trình nâng cao</h2>
        </aside>
    );
}

export default Sidebar;
