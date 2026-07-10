import { createBrowserRouter } from "react-router";
import { InvoiceScreen } from "./InvoiceScreen";
import { PosScreen } from "./PosScreen";

export const router = createBrowserRouter([
  { path: "/", Component: PosScreen },
  { path: "/invoice", Component: InvoiceScreen },
]);
