import React from 'react';
import { message, Upload, Button, Form, Input, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './Upload.module.scss';
import { t } from '~/helpers/i18n';

const cx = classNames.bind(styles);

const layout = {
  labelCol: { span: 20, offset: 2 },
  wrapperCol: { span: 20, offset: 2 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

function UploadFile() {
  const [form] = Form.useForm();
  const props = {
    name: 'file',
    mltiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        form.setFieldsValue({
          filePath: 'file-success.pdf',
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const onGenderChange = (value) => {
    console.log(value);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('form-title')}>{t('UploadForm.TitleForm')}</div>
      <div className={cx('wrapper-form')}>
        <div className={cx('form-upload')}>
          <div className={cx('dragger')}>
            <Upload.Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{t('UploadForm.DraggerTitle')}</p>
              <p className="ant-upload-hint">{t('UploadForm.DraggerNote')}</p>
            </Upload.Dragger>
          </div>
        </div>
        <div className={cx('form-text')}>
          <Form {...layout} form={form} layout="vertical" name="control-ref" onFinish={onFinish}>
            <Form.Item
              name="fileTitle"
              label={t('UploadForm.TitleFile')}
              rules={[
                {
                  required: true,
                },
                {
                  type: 'string',
                  min: 10,
                },
              ]}
            >
              <Input.TextArea placeholder={t('UploadForm.EnterTitleFile')} showCount maxLength={100} rows={2} />
            </Form.Item>
            <Form.Item name="category" label={t('UploadForm.CategoryFile')} rules={[{ required: true }]}>
              <Select placeholder={t('UploadForm.SelectCategoryFile')} onChange={onGenderChange} allowClear>
                <Select.Option value="math">Math</Select.Option>
                <Select.Option value="it">Information Technology</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.category !== currentValues.category}
            >
              {({ getFieldValue }) =>
                getFieldValue('category') === 'other' ? (
                  <Form.Item name="addCategory" label={t('UploadForm.AddCategoryFile')} rules={[{ required: true }]}>
                    <Input placeholder={t('UploadForm.EnterAddCategoryFile')} />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item
              name="description"
              label={t('UploadForm.Description')}
              rules={[
                { required: true },
                {
                  type: 'string',
                  min: 20,
                },
              ]}
            >
              <Input.TextArea placeholder={t('UploadForm.EnterDescription')} showCount maxLength={300} rows={5} />
            </Form.Item>
            <Form.Item name="filePath" hidden={true} initialValue="file-demo.pdf"></Form.Item>
            <Form.Item {...tailLayout}>
              <Button size="large" type="primary" htmlType="submit">
                {t('UploadForm.Actions.Submit')}
              </Button>
              <Button size="large" htmlType="button" onClick={onReset} className={cx('button-reset')}>
                {t('UploadForm.Actions.Reset')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
