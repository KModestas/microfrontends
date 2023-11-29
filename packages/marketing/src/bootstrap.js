import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app (arbitrary name)
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      // since MemoryRouter never reads the URL, it will always initialise with "/"
      initialEntries: [initialPath],
    });

  // onNavigate will not exist when running in isolation (its created by the container)
  if (onNavigate) {
    // callback invoked by react router whenever navigation occurs
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    // provide a function to the container so that it can update the child apps path
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and running the app in isolation, call mount immediately. 
// NODE_ENV is set automatically by webpack based on the "mode" specified in webpack.config
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  // this element should not exist in the container
  if (devRoot) {
    mount(devRoot, {
      // when running the app in isolation, use browser router so that we can see the address bar update (better DX)
      defaultHistory: createBrowserHistory()
    });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
