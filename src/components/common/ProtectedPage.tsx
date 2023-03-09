import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const ProtectedPageLoggedIn = () => {
  const { user } = useContext(UserContext);
  if (user === null) return <Navigate to='/ ' replace />;
  return <Outlet />;
};

export const ProtectedPageLoggedOut = ({ children }) => {
  const { user } = useContext(UserContext);
  return user !== null ? <Navigate to='/viewAllEvents/1' replace /> : children;
};
