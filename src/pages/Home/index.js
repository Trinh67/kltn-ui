import { Pagination, Empty } from 'antd';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import { t } from '~/helpers/i18n';
import styles from './Home.module.scss';
import { fileServices } from '~/services';
import DocumentInList from '~/components/Document/DocumentInList';

const cx = classNames.bind(styles);

function Home() {
  const [files, setFiles] = useState([]);
  const [filesShow, setFilesShow] = useState([]);
  const [current, setCurrent] = useState(1);

  const initial = async () => {
    let result
    if(localStorage.getItem('category') > 0) {
      result = await fileServices.getListCategoryFiles(localStorage.getItem('category'));
      localStorage.setItem('category', 0);
    }
    else {
      result = await fileServices.getListFiles();
    }
    setFiles(result.data.files);
    setFilesShow(result.data.files.slice(0, 10));
  };

  const onPaginationChange = (page, pageSize) => {
    setCurrent(page);
    setFilesShow(files.slice((page - 1) * pageSize, page * pageSize));
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <div>
      <div className={cx('wrapper')}>
        {!!filesShow.length > 0 ? filesShow.map((file) => <DocumentInList file={file} key={file.id} />) : (<Empty />)}
      </div>
      <div className={cx('pagination')}>
        <Pagination current={current} defaultPageSize={10} total={files.length}
                    showTotal={(total) => `${t('Pagination.Total')} ${total} ${t('Pagination.Items')}`} showSizeChanger onChange={onPaginationChange}
                    pageSizeOptions={[5, 10, 15]} />
      </div>
    </div>
  );
}

export default Home;
