import { createBrowserRouter, RouterProvider } from "react-router-dom";

//view
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import OrderPage from "./pages/OrderPageView";

import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import DetailTicket from "./pages/DetailTicketView";

//loader

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "/order-page",
        element: <OrderPage />,
      },
      {
        path: "/detail-ticket",
        element: <DetailTicket />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
