import DocumentInList from "~/components/Document/DocumentInList";

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <DocumentInList />
                <DocumentInList />
                <DocumentInList />
                <DocumentInList />
                <DocumentInList />
                <DocumentInList />
            </div>
            <div className={cx('pagination')}>
                <Pagination defaultCurrent={1} total={100} />
            </div>
        </div>
    );
}

export default Home;
