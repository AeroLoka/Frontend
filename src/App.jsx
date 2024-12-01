import { createBrowserRouter, RouterProvider } from "react-router-dom";

//view
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";

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
    return(
      <RouterProvider router={router} />
    )
}

export default App;
