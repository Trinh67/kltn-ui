import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import { elasticServices } from '~/services';
import { SearchIcon } from '~/components/Icons';
import SearchItem from '~/components/SearchItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import { t } from '~/helpers/i18n';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const initial = async (params) => {
    const result = await elasticServices.searchFiles(params);
    setSearchResult(result.data.files);
  };

  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);
    let timer;
    if (searchValue) {
      timer = setTimeout(() => {
        initial({ content: searchValue });
        setShowResult(true);
      }, 1800);
    }
    setLoading(false);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleSearchClick = async () => {
    setLoading(true);
    await fetchApi(3000);
    setSearchResult([1, 2]);
    setLoading(false);
  };

  const fetchApi = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleSearchItemClick = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResult}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs} onClick={handleSearchItemClick}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>{t('SearchResults.title')}</h4>
            {!!searchResult.length > 0 && searchResult.map((file) => <SearchItem file={file} key={file.id} />)}
            {!!searchResult.length === 0 && <p>No data</p>}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder={t('HeaderActions.SearchContent')}
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {!!searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

        <button className={cx('search-btn')} disabled={!searchValue} onClick={handleSearchClick}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
