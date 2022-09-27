import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from "@infrastructure/redux/config/store";
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from './assets/themes/defaultTheme';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={defaultTheme}>
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                    <App/>
                {/*</PersistGate>*/}
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
