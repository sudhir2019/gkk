import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores/store'; // Ensure proper import path
import App from './App';
import './css/app.css';
import './css/index.css';
import './css/buttons.dataTables.min.css';
import './css/jquery.dataTables.min.css';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import '@popperjs/core/dist/esm/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
