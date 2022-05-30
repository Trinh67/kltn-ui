import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <h2>Algebra</h2>
      <h2>Calculus 1</h2>
      <h2>Calculus 2</h2>
      <h2>Database</h2>
      <h2>Advanced Programming</h2>
    </div>
  );
}

export default Sidebar;
