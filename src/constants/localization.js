import 'react-i18next';
// Flags
import viFlag from '~/assets/images/flags/vi.svg';
import enFlag from '~/assets/images/flags/en.svg';
// Translation files
import viTrans from '~/locales/vi/translation.json';
import enTrans from '~/locales/en/translation.json';

const RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
};

const REGIONS = {
  vi: {
    key: 'vi',
    name: 'Vietnamese',
    flag: viFlag,
  },
  en: {
    key: 'en',
    name: 'English',
    flag: enFlag,
  },
};

export default {
  RESOURCES,
  REGIONS,
};
