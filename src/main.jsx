import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Product from './components/Product/Product';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Home from './pages/Home';
import Login from './components/Login';
import Logout from './components/Logout'
import Todo from "./components/Todo";
import { Provider } from 'react-redux';
import Protected from './protected';
import store from './store/store';
import {lazy} from 'react';
import {Suspense} from 'react';
// import SearchBox from './components/SearchBox';
// Defining the router
const SearchBox= lazy(()=>import('./components/SearchBox'))
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
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "searchbox",
        element:<Suspense fallback={<div>Loading...</div>}> 
        <SearchBox />
        </Suspense>
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
        path: "/product",
        element: <Product />,
      },
      {
        path: "/",
        element: <Protected />,  // This is the layout for protected routes
        children: [
          {
            path: "home",
            element: <Home />,
          },
          
        ],
      },
    ],
  },
]);


// Rendering the app
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
 
);
