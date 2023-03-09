import { BaseContext } from './BaseContext';
import { StaticContextDataWrapper } from './StaticContextDataWrapper';
import { v4 as uuidv4 } from 'uuid';

class ContextsStaticDataBus {
  private readonly contextsDataPool: Map<string, StaticContextDataWrapper> = new Map();

  addContextToPool<T extends BaseContext>(defaultValue: T) {
    const contextKey = uuidv4();
    this.contextsDataPool.set(contextKey, new StaticContextDataWrapper(defaultValue));

    return contextKey;
  }

  setContextData<T extends BaseContext>(contextKey: string, data: T) {
    this.contextsDataPool.get(contextKey).setContextValue(data);
  }

  getContextData<T extends BaseContext>(contextKey: string) {
    return this.contextsDataPool.get(contextKey).getContextValue<T>() as T;
  }
}

export default new ContextsStaticDataBus();
