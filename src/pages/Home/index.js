import { Pagination } from 'antd';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Home.module.scss';
import { fileServices } from '~/services';
import DocumentInList from '~/components/Document/DocumentInList';

const cx = classNames.bind(styles);

function Home() {
  const [files, setFiles] = useState([]);

  const initial = async () => {
    const result = await fileServices.getListFiles();
    setFiles(result.data.files);
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <div>
      <div className={cx('wrapper')}>
        {!!files.length > 0 && files.map((file) => <DocumentInList file={file} key={file.id} />)}
      </div>
      <div className={cx('pagination')}>
        <Pagination defaultCurrent={1} total={100} />
      </div>
    </div>
  );
}

export default Home;
