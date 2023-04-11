import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UILayoutTypeA from "./uiLayout/uiLayoutTypeA";
import About from "./conponents/About";
import StringUtils from "./conponents/StringUtils";
import UncertaintyCalculator from "./conponents/UncertaintyCalculator";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <UILayoutTypeA>
        <About />
      </UILayoutTypeA>
    ),
    children: [],
  },
  {
    path: "/string-utils",
    Component: () => (
      <UILayoutTypeA>
        <StringUtils />
      </UILayoutTypeA>
    ),
  },
  {
    path: "/uncertainty-calculator",
    Component: () => (
      <UILayoutTypeA>
        <UncertaintyCalculator />
      </UILayoutTypeA>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
