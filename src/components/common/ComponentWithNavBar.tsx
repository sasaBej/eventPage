import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { MediatorEventsIdentifiers } from '../../events/EventsIdentifiers';
import Mediator from '../../events/Mediator';
import { NavBar } from './NavBar';
import { StyledBoxComponentWithNavbar } from './StyledComponents';

export const ComponentWithNavBar = ({ children }) => {
  const contentWrapper = useRef(null);

  const scrollContentToTop = useCallback(() => {
    if (contentWrapper.current == null) return;

    contentWrapper.current.scrollTop = 0;
  }, []);

  useLayoutEffect(() => {
    scrollContentToTop();
  }, [children]);

  useEffect(() => {
    const subscriber = Mediator.subscribe(MediatorEventsIdentifiers.scrollContentWrapperToTop, scrollContentToTop);

    return () => subscriber.unsubscribe();
  }, []);

  return (
    <>
      <NavBar />
      <StyledBoxComponentWithNavbar ref={contentWrapper}>{children}</StyledBoxComponentWithNavbar>
    </>
  );
};
