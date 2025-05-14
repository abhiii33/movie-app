import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Home from './pages/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import { Provider } from 'react-redux';
import Protected from './protected';
import store from './store/store';
import {Theme} from "@radix-ui/themes"
import "@radix-ui/themes/styles.css";
import SearchBox from './components/SearchBox';
// Defining the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/",
        element: <Protected />,  // This is the layout for protected routes
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "searchbox",
            element: <SearchBox />,
          },
        ],
      },
    ],
  },
]);


// Rendering the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <Theme  accentColor="crimson" grayColor="sand" radius="large" scaling="95%"  appearance="dark">
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </Theme>
);
