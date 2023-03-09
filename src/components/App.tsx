import React, { useMemo } from 'react';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/auth-page/AuthPage';
import { AddEventPage } from './pages/add-event-page/AddEventPage';
import { UserContextProvider } from './contexts/UserContext';
import { ViewEventPage } from './pages/view-event-page/ViewEventPage';
import { ErrorPage } from './common/ErrorPage';
import { ComponentWithNavBar } from './common/ComponentWithNavBar';
import { ProtectedPageLoggedIn, ProtectedPageLoggedOut } from './common/ProtectedPage';
import { ViewAllEvents } from './pages/view-all-events/ViewAllEvents';

const theme = createTheme({
  palette: {
    primary: {
      light: '#778DCF',
      main: '#459995',
      dark: '#778DCF'
    },
    secondary: {
      light: '#778DCF',
      main: '#778DCF',
      dark: '#778DCF'
    }
  },
  typography: {
    fontFamily: 'Work Sans',
    subtitle1: {
      fontSize: 12
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 'normal'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'normal'
    },
    overline: {
      fontSize: '1.2rem',
      fontWeight: '400'
    }
  }
});

export const App = () => {
  const globalStyles = useMemo(
    () => (
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          body: { height: '100%' },
          '#root': { height: '100%', backgroundColor: '#fbfcfe' }
        }}
      />
    ),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedPageLoggedOut>
                  <AuthPage />
                </ProtectedPageLoggedOut>
              }
            ></Route>
            <Route element={<ProtectedPageLoggedIn />}>
              <Route
                path='viewAllEvents/:pageId'
                element={
                  <ComponentWithNavBar>
                    <ViewAllEvents />
                  </ComponentWithNavBar>
                }
              />
              <Route
                path='add-event'
                element={
                  <ComponentWithNavBar>
                    <AddEventPage />
                  </ComponentWithNavBar>
                }
              />
              <Route
                path='event/:eventId'
                element={
                  <ComponentWithNavBar>
                    <ViewEventPage />
                  </ComponentWithNavBar>
                }
              />
              <Route path='error-page' element={<ErrorPage />} />
            </Route>
            <Route path='*' element={<>Error 404</>}></Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
