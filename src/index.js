import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import App from '~/App';
import i18n from '~/i18n';
import { browserHistory } from '~/helpers';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <I18nextProvider i18n={i18n} history={browserHistory}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
