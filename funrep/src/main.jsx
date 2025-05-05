import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores/store'; // Ensure proper import path
import '../src/assets/css/ChangePassword.css';
import "../src/assets/css/ChangePassword1.css";
import "../src/assets/css/ChangePassword.css";
import '../src/assets/css/ContactUs.css';
import '../src/assets/css/boilerplate.css';
import '../src/assets/css/style.css';
import '../src/assets/css/PointTransfer.css';
import '../src/assets/css/DrawDetails.css';
import '../src/assets/css/header.css';
import '../src/assets/css/boilerplate.css';
import '../src/assets/css/style.css';
import '../src/assets/css/PointTransfer.css';
import "../src/assets/css/UpdateProfile.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
