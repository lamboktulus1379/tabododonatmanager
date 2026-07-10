import { createBrowserRouter } from "react-router";
import { DashboardScreen } from "./DashboardScreen";
import { InvoiceScreen } from "./InvoiceScreen";
import { OrderHistoryScreen } from "./OrderHistoryScreen";
import { ManagerShell } from "./ManagerShell";
import { MenuScreen, OperationsScreen } from "./ManagerUtilityScreens";
import { PosScreen } from "./PosScreen";

export const router = createBrowserRouter([
  { path: "/invoice", Component: InvoiceScreen },
  {
    Component: ManagerShell,
    children: [
      { index: true, Component: DashboardScreen },
      { path: "dashboard", Component: DashboardScreen },
      { path: "orders", Component: OrderHistoryScreen },
      { path: "menu", Component: MenuScreen },
      { path: "operations", Component: OperationsScreen },
      { path: "pos", Component: PosScreen },
    ],
  },
]);
