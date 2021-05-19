import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import { Provider } from 'react-redux';
import { store } from './store/store';

const App1=React.lazy(()=>import('app1/App'));

export const App=()=>{

    return (
      <Provider store={store}>
      <div>
      Core-ui-1
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback="Loading App1" >
        <App1
          store={store}
        />
        </React.Suspense>
        </ErrorBoundary>
        </div>
        </Provider>
    )
};

const ErrorFallback=({error})=>{
    return (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre style={{color: 'red'}}>{error.message}</pre>
        </div>
      )
}