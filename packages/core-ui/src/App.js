import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { NameChanger } from "./NameChanger";
import { store } from "./store/store";
const App1 = React.lazy(() => import("app1/App"));
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "./index.css";

export const App = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "buy",
          element: <App1 store={store} />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      {/* <div>
        Core-ui-1 */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback="Loading App1">
          {/* <NameChanger />
            <App1 store={store} /> */}
          <RouterProvider router={router} />
        </React.Suspense>
      </ErrorBoundary>
      {/* </div> */}
    </Provider>
  );
};

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};
