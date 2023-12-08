import React from 'react';
import { Route, BrowserRouter as Router, Routes, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from '../screens/homePage';
import SearchPage from '../screens/searchPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/recherche",
    element: <SearchPage />,
  },
]);


const AppRouter = () => (
<RouterProvider router={router} />
);

export default AppRouter;
