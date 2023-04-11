import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UILayoutTypeA from "./uiLayout/uiLayoutTypeA";
import About from "./components/About";
import StringUtils from "./components/StringUtils";
import UncertaintyCalculator from "./components/UncertaintyCalculator";
import ErrorNotice from "./components/ErrorNotice";

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
