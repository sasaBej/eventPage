import { BaseContext } from './BaseContext';

export class StaticContextDataWrapper {
  private contextData: { value: BaseContext };

  constructor(contextValue: BaseContext) {
    this.contextData = {
      value: contextValue
    };
  }

  setContextValue(newValue: BaseContext) {
    this.contextData.value = newValue;
  }

  getContextValue<T extends BaseContext>() {
    return this.contextData.value as T;
  }
}
