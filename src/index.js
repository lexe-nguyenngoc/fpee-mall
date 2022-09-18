import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '~/app/store';

import App from '~/App';
const GlobalStyles = lazy(() => import('~/components/GlobalStyles'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading....</div>}>
      <Provider store={store}>
        <GlobalStyles>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalStyles>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
