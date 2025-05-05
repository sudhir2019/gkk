import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores/store';
import App from './App.jsx'
import "./assets/css/boilerplate.css";
import "./assets/css/style779f.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/style-acc.css";
import "./assets/css/font-awesome.css";
import "./assets/css/datepicker.css";
import "./assets/Content/JqGrid/GridView.css";
import "zebra_datepicker";
import "zebra_datepicker/dist/css/default/zebra_datepicker.min.css"; // Import Zebra Datepicker CSS
import "./assets/Content/themes/base/jquery-ui.css";
import "./assets/Content/JqGrid/JqGridTheme.css";
import "jsgrid/dist/jsgrid.min.css";
import "jsgrid/dist/jsgrid-theme.min.css";
import "jsgrid"
import "./index.css"
import "./assets/css/PopUp.css";
import "./assets/css/PopUp2.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
