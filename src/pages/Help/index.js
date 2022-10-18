import classNames from 'classnames/bind';
import styles from '~/pages/Help/Help.module.scss';

const cx = classNames.bind(styles);

function Help() {
    return (
      <div className={cx('wrapper')}>
        <p>Ứng dụng hỗ trợ tìm kiếm chính xác và tương đối nội dung cần tìm kiếm. Để tìm kiếm chính xác bạn thêm dấu
           nháy kép '"' bao từ cần tìm kiếm chính xác đó.</p>
        <span><b>Thông tin liên hệ hỗ trợ:</b></span>
        <p>Hỗ trợ qua Email: trinhtx.uet@gmail.com</p>
        <p><b>Thời gian hỗ trợ:</b></p>
        <p>Sáng: 8h30 - 11h30</p>
        <p>Chiều: 13h30 - 17h30</p>
        <p>Tối: 20h30 - 22h30</p>
        <p>(Các ngày trong tuần từ thứ 2-7)</p>
      </div>
    )
}

export default Help;
