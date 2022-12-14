import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './routing';
import reportWebVitals from './reportWebVitals';

import ErrorPage from './Pages/ErrorPage';

ReactDOM.render(
    <React.StrictMode>
        <ErrorPage>
            <Routing />
        </ErrorPage>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
