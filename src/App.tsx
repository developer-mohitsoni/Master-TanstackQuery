import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/pages/Home";
import { FetchOld } from "./components/pages/FetchOld";
import FetchRQ from "./components/pages/FetchRQ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FetchIndv } from "./components/pages/FetchIndv";
import { InfiniteScroll } from "./components/pages/InfiniteScroll";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroll />,
      },
    ],
  },
]);

export default App;
