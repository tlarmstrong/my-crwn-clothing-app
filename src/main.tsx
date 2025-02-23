import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import App from './App';
import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <PersistGate loading={ null } persistor= { persistor }>
        <BrowserRouter>
          <Elements stripe={ stripePromise }>
            <App />
            </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
