import React, { useState, createContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediatorEventsIdentifiers } from '../../events/EventsIdentifiers';
import Mediator from '../../events/Mediator';
import { defaultUser, UserContextFields } from '../../types/UserContextFields';

export interface UserContextModel {
  user: UserContextFields;
  setUser: (value: UserContextFields) => void;
}

export const UserContext = createContext<UserContextModel>({
  user: defaultUser,
  setUser: null
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState<UserContextFields>(JSON.parse(sessionStorage.getItem('user')));
  const navigate = useNavigate();

  const contextValue = useMemo<UserContextModel>(() => {
    return {
      user: user,
      setUser: setUser
    };
  }, [user, setUser]);

  useEffect(() => {
    const subscription = Mediator.subscribe(MediatorEventsIdentifiers.userLoggedIn, (loggedUser: UserContextFields) => {
      sessionStorage.setItem('user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate('/viewAllEvents/1');
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = Mediator.subscribe(MediatorEventsIdentifiers.userLoggedOut, () => {
      sessionStorage.removeItem('user');
      setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
