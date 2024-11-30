import { createBrowserRouter, RouterProvider } from "react-router-dom";

//view
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import DetailTicket from "./pages/DetailTicketView";
import OrderPage from "./pages/OrderPageView";
import PaymentView from "./pages/PaymentView";
import PaymentStatusPage from "./pages/PaymentStatusPage";

import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";

//loader

//storage
import { store } from "./store";
import ProfileView from "./pages/ProfileView";

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
              path: "profile",
              element: <ProfileView/>
            },
            {
              path: "/detail-ticket",
              element: <DetailTicket />,
            },
            {
              path: '/order-page',
              element: <OrderPage />,
            },
            {
              path: '/payment',
              element: <PaymentView/>
            },
            {
              path: `/payment-status`,
              element: <PaymentStatusPage />,
            },
        ],
    },
    {
      path: "/login",
      element: <LoginView/>
    },
    {
      path: "/register",
      element: <RegisterView/>
    }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
