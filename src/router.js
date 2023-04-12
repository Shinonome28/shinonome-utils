import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import UILayoutTypeA from "./uiLayout/uiLayoutTypeA";
import About from "./components/About";
import StringUtils from "./components/StringUtils";
import UncertaintyCalculator from "./components/UncertaintyCalculator";
import ErrorNotice from "./components/ErrorNotice";
import HelpCenter from "./components/HelpCenter";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <UILayoutTypeA>
        <Outlet />
      </UILayoutTypeA>
    ),
    children: [
      {
        path: "",
        element: <About />,
      },
      {
        path: "string-utils",
        element: <StringUtils />,
      },
      {
        path: "uncertainty-calculator",
        element: <UncertaintyCalculator />,
      },
      {
        path: "help/:helpdoc",
        element: <HelpCenter />,
      },
    ],
  },

  {
    // 404 page not found
    path: "*",
    Component: () => (
      <ErrorNotice
        text={
          "The URL you are looking for does not exist. Please check your URL."
        }
      ></ErrorNotice>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
