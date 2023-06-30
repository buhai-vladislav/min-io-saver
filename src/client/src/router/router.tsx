import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { CreateTask } from '../components/CreateTask';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import RootLayout from '../layouts/RootLayout';
import { GridWrapper } from '../shared/GridWrapper';
import { ProtectedRoute } from '../shared/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <>Some</>,
      },
      {
        path: 'login',
        element: (
          <GridWrapper>
            <Login />
          </GridWrapper>
        ),
      },
      {
        path: 'signup',
        element: (
          <GridWrapper>
            <SignUp />
          </GridWrapper>
        ),
      },
      {
        path: 'main',
        element: (
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
