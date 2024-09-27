import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";
import { loader as menuLoader } from "./features/menu/Menu";
// import { action as createMenuAction } from "./features/menu/CreateMenu";

import WeekMenu from "./features/weekMenu/WeekMenu";
import WeekMenuClapesVersion from "./features/weekMenu/WeekMenuClapesVersion";

import CreateMenu from "./features/menu/CreateMenu";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: menuLoader,
      },
      {
        path: "/weekmenuold",
        element: <WeekMenu />,
      },
      {
        path: "/weekmenu",
        element: <WeekMenuClapesVersion />,
      },
      // {
      //   path: "/createmenu",
      //   element: <CreateMenu></CreateMenu>,
      //   action: createMenuAction,
      // },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 2000,
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "rgb(161 98 7)",
            color: "rgb(240 253 244)",
          },
        }}
      ></Toaster>
    </QueryClientProvider>
  );
}

export default App;
