import classNames from 'classnames/bind';
import styles from '~/pages/Help/Help.module.scss';

const cx = classNames.bind(styles);

function Help() {
    return (
      <div className={cx('wrapper')}>
        <p>Hỗ trợ qua Email: trinhtx.uet@gmail.com</p>
        <br/>
        <p>Thời gian hỗ trợ:</p>
        <br/>
        <p>Sáng: 8h30 - 11h30</p>
        <p>Chiều: 13h30 - 17h30</p>
        <p>Tối: 20h30 - 22h30</p>
        <p>(Các ngày trong tuần từ thứ 2-7)</p>
      </div>
    )
}

export default Help;
