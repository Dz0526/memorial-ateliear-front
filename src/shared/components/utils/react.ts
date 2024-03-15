import * as React from 'react';

type Options = {
  strict?: boolean;
  errorMessage?: string;
  name?: string;
};

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export const createContext = <ContextType = any>({
  strict = true,
  errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
  name,
}: Options = {}) => {
  const Context = React.createContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  const useContext = () => {
    const context = React.useContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  };

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>;
};
