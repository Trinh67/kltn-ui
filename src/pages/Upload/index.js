import cookies from 'js-cookies';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button, Form, Input, Select, Spin } from 'antd';

import { t } from '~/helpers/i18n';
import styles from './Upload.module.scss';
import { categoryServices, elasticServices } from '~/services';
import localStorageConstants from '~/constants/localStorage';
import localizationConstants from '~/constants/localization';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

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
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [languageVi, setLanguageVi] = useState(true);

  const props = {
    name: 'upload_file_request',
    mltiple: false,
    action: 'http://127.0.0.1:8000/api/v1/file/upload-file',
    headers: { Authorization: `Bearer ${cookies.getItem('token')}` },
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        const { response } = info.file;
        form.setFieldsValue({
          filePath: response.data.fileName,
        });
        message.success(`${info.file.name} ${t('Messages.UploadSuccess')}`);
      } else if (status === 'error') {
        const { response } = info.file;
        message.error(response.message);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const initial = async () => {
    const result = await categoryServices.getListCategories();
    setCategories(result);
  };

  useEffect(() => {
    if (!!localStorage.getItem(LOCALIZATION)) {
      setLanguageVi(localStorage.getItem(LOCALIZATION) === REGIONS.vi.key);
    }
    ;
    initial();
  }, []);

  const onCategoryChange = (value) => {
    console.log(value);
  };
  const onFinish = async (values) => {
    setUploading(true);
    const res = await elasticServices.createFile(values);
    setUploading(false);
    if (res.code === 200) {
      form.resetFields();
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <Spin tip='Uploading...' spinning={uploading}>
          <div className={cx('form-title')}>{t('UploadForm.TitleForm')}</div>
          <div className={cx('wrapper-form')}>
            <div className={cx('form-upload')}>
              <div className={cx('dragger')}>
                <Upload.Dragger {...props}>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='ant-upload-text'>{t('UploadForm.DraggerTitle')}</p>
                  <p className='ant-upload-hint'>{t('UploadForm.DraggerNote')}</p>
                </Upload.Dragger>
              </div>
            </div>
            <div className={cx('form-text')}>
              <Form {...layout} form={form} layout='vertical' name='control-ref' onFinish={onFinish}>
                <Form.Item
                  name='fileTitle'
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
                <Form.Item name='categoryId' label={t('UploadForm.CategoryFile')} rules={[{ required: true }]}>
                  <Select
                    placeholder={t('UploadForm.SelectCategoryFile')}
                    onChange={onCategoryChange}
                    allowClear
                    showSearch={true}
                    optionFilterProp='children'
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {!!categories.length > 0 &&
                      languageVi &&
                      categories.map((category) => (
                        <Select.Option value={category.id} key={category.id}>
                          {category.nameVi}
                        </Select.Option>
                      ))}
                    {!!categories.length > 0 &&
                      !languageVi &&
                      categories.map((category) => (
                        <Select.Option value={category.id} key={category.id}>
                          {category.nameEn}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.category !== currentValues.category}
                >
                  {({ getFieldValue }) =>
                    getFieldValue('category') === '12' ? (
                      <Form.Item name='addCategory' label={t('UploadForm.AddCategoryFile')}>
                        <Input placeholder={t('UploadForm.EnterAddCategoryFile')} />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
                <Form.Item
                  name='fileDescription'
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
                <Form.Item name='filePath' hidden={true} initialValue='file-demo.pdf'></Form.Item>
                <Form.Item {...tailLayout}>
                  <Button size='large' type='primary' htmlType='submit'>
                    {t('UploadForm.Actions.Submit')}
                  </Button>
                  <Button size='large' htmlType='button' onClick={onReset} className={cx('button-reset')}>
                    {t('UploadForm.Actions.Reset')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Spin>
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: '2rem',
        width: '100%',
        fontWeight: 'bold',
        position: 'fixed',
        bottom: '20px',
      }}>
        University of Engineering and Technology
      </div>
    </>
  );
}

export default UploadFile;
