import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
  } from "react-router-dom";

import Root from './routes/root.tsx'
import Home from './routes/home.tsx'
import About from './routes/about.tsx'
import ErrorPage from "./error-page";

const router = createBrowserRouter([{
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/about",
          element: <About />,
          errorElement: <ErrorPage />,
        },
      ]
    },]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>       
);

// Shantanu's Dev Tag

let asciiStyle = [
    'font-size: 6px',
    'font-weight: bold',
    'font-family: monospace',
    'display: flex',
    
].join(';');

let logStyle = [
    'font-size: 16px',
].join(';');


let msg = `%cThis website was designed, programmed, and engineered by:
 %c▄████████    ▄█    █▄       ▄████████ ███▄▄▄▄       ███        ▄████████ ███▄▄▄▄   ███    █▄       
  ███    ███   ███    ███     ███    ███ ███▀▀▀██▄ ▀█████████▄   ███    ███ ███▀▀▀██▄ ███    ███      
  ███    █▀    ███    ███     ███    ███ ███   ███    ▀███▀▀██   ███    ███ ███   ███ ███    ███      
  ███         ▄███▄▄▄▄███▄▄   ███    ███ ███   ███     ███   ▀   ███    ███ ███   ███ ███    ███      
▀███████████ ▀▀███▀▀▀▀███▀  ▀███████████ ███   ███     ███     ▀███████████ ███   ███ ███    ███      
         ███   ███    ███     ███    ███ ███   ███     ███       ███    ███ ███   ███ ███    ███      
   ▄█    ███   ███    ███     ███    ███ ███   ███     ███       ███    ███ ███   ███ ███    ███      
 ▄████████▀    ███    █▀      ███    █▀   ▀█   █▀     ▄████▀     ███    █▀   ▀█   █▀  ████████▀       
                                                                                                    
    ▄█    ▄█    █▄       ▄████████  ▄█    █▄     ▄████████    ▄████████  ▄█                          
    ███   ███    ███     ███    ███ ███    ███   ███    ███   ███    ███ ███                          
    ███   ███    ███     ███    ███ ███    ███   ███    █▀    ███    ███ ███▌                         
    ███  ▄███▄▄▄▄███▄▄   ███    ███ ███    ███  ▄███▄▄▄      ▄███▄▄▄▄██▀ ███▌                         
    ███ ▀▀███▀▀▀▀███▀  ▀███████████ ███    ███ ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   ███▌                         
    ███   ███    ███     ███    ███ ███    ███   ███    █▄  ▀███████████ ███                          
    ███   ███    ███     ███    ███ ███    ███   ███    ███   ███    ███ ███                          
█▄ ▄███   ███    █▀      ███    █▀   ▀██████▀    ██████████   ███    ███ █▀                           
▀▀▀▀▀▀                                                        ███    ███                              
`

console.log(msg, logStyle,asciiStyle);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
