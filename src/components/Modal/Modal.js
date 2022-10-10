import React from "react";
import styles from './Modal.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CustomModal = ({ show, children }) => {
  const showHideClassName = show ? "modal show" : "modal hidden";

  return (
    <div className={cx(showHideClassName)}>
      <div className={cx("modal-container")}>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
