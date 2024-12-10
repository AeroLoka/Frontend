import { createBrowserRouter, RouterProvider } from "react-router-dom";

//view
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import DetailTicket from "./pages/DetailTicketView";
import OrderPage from "./pages/OrderPageView";
import PaymentView from "./pages/PaymentView";
import PaymentStatusPage from "./pages/PaymentStatusPage";
import NotificationView from "./pages/NotificationView";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import ProfileView from "./pages/ProfileView";

//loader

//storage
import { store } from "./store";

import ButtonChange from "./components/Button/ButtonChange";
import OrderHistory from "./pages/OrderHistoryView";
import VerifyEmailView from "./pages/auth/VerifyEmailView";
import ResetPasswordView from "./pages/auth/ResetPasswordView";
import OTPView from "./pages/auth/OTPView";
import NotFound from "./pages/NotFound";

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
        element: <ProfileView />,
      },
      {
        path: "/detail-ticket",
        element: <DetailTicket />,
      },
      {
        path: "/search",
        element: <ButtonChange />,
      },
      {
        path: "/order-page",
        element: <OrderPage />,
      },
      {
        path: "/payment",
        element: <PaymentView />,
      },
      {
        path: `/payment-status`,
        element: <PaymentStatusPage />,
      },
      {

        path: `/order-history`,
        element: <OrderHistory />,
      },
      {
        path: `/notifications`,
        element: <NotificationView />,
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
  {
    path: "/activation/otp",
    element: <OTPView />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
