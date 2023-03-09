import { useEffect } from 'react';
import { BaseContext } from './BaseContext';
import ContextsStaticDataBus from './ContextsStaticDataBus';

const useShareContextDataProxy = (contextKey: string, contextValue: BaseContext) => {
  useEffect(() => {
    ContextsStaticDataBus.setContextData(contextKey, contextValue);
  }, [contextKey, contextValue]);
};

export default useShareContextDataProxy;
