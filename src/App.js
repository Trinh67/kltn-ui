import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '~/components/Layout';
import { privateRoutes, publicRoutes } from '~/routes';
import cookies from 'js-cookies';
import { Button, Result } from 'antd';
import { t } from '~/helpers/i18n';

function App() {
  const currentUser = !!cookies.getItem('token') ? JSON.parse(localStorage.getItem('currentUser')) : null;
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(null));
    }
  });
  return (<Router>
    <div className='App'>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (<Route
            key={index}
            path={route.path}
            element={<Layout>
              <Page />
            </Layout>}
          />);
        })}
        {!!currentUser ? (
          privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (<Route
              key={index}
              path={route.path}
              element={<Layout>
                <Page />
              </Layout>}
            />);
          })
        ) : (
          <Route
            key={404}
            path='*'
            element={<Result
              status='404'
              title='404'
              subTitle={t('Messages.NotFound')}
              extra={<Button type='primary' href='/'>{t('Messages.BackToHome')}</Button>}
            />}
          />)}
      </Routes>
    </div>
  </Router>);
}

export default App;
