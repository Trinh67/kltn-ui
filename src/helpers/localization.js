import localStorageConstants from '~/constants/localStorage';
import localizationConstants from '~/constants/localization';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

const getCurrentLanguage = () => {
  const language = localStorage.getItem(LOCALIZATION) || REGIONS.vi.key;
  return language;
};

const changeLanguage = (language) => {
  if (language === getCurrentLanguage()) return;
  localStorage.setItem(LOCALIZATION, language);
  window.location.reload();
};

export default {
  getCurrentLanguage,
  changeLanguage,
};
