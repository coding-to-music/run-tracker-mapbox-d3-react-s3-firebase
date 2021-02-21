import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import styled, { ThemeProvider } from 'styled-components';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-datepicker/dist/react-datepicker.css';
import debounce from 'lodash/debounce';
import LogRocket from 'logrocket';
import cookie from 'js-cookie';

import Nav from '../src/features/Nav/Nav';
import {
  authenticateUser,
  setValidating,
} from '../src/features/Auth/authSlice';
import { theme, GlobalStyle } from '../src/utils/theme';
import { configStore } from '../src/reducers/store';
import API_URL from '../src/utils/url';
import Notifications from '../src/features/Notifications/Notifications';
import { useUnits } from '../src/utils/useUnits';

config.autoAddCss = false;

// NProgress events
let NProgress;
let start;

if (typeof window !== 'undefined') {
  NProgress = require('nprogress');
  start = debounce(NProgress.start, 200);
}

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', () => {
  start.cancel();
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  start.cancel();
  NProgress.done();
});

// LogRocket
if (process.env.NODE_ENV === 'development') {
  LogRocket.init('hhtrbz/run-tracker');
} else {
  LogRocket.init('hhtrbz/run-tracker-prod');
}

const Container = styled.div`
  background-color: #fff;
`;

const Layout = ({ children }) => {
  const [units] = useUnits();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user`, {
          credentials: 'include',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const { token, user } = await response.json();

          dispatch(authenticateUser({ authenticated: token, user }));
        } else {
          const res = await response.json();
        }

        dispatch(setValidating(false));
      } catch (error) {
        dispatch(setValidating(false));
      }
    };

    getUser();
  }, []);

  return (
    <>
      <Container>
        <Head>
          <title>Run Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <>{children}</>
      </Container>
    </>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={configStore}>
        <Layout>
          <Component {...pageProps} />
          <Notifications />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export { Layout };
// export default withReduxStore(MyApp);
export default MyApp;
