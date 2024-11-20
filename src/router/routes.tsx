import Layout from "@/components/layout";
import Coin from "@/pages/Coin";
import Counter from "@/pages/Counter";
import Home from "@/pages/Home";
import WalletConnection from "@/pages/WalletConnection";
import { createBrowserRouter as Router } from "react-router-dom";

export const routes = Router([
  {
    path: "*",
    element: <div>Page not found</div>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/coin/:id",
        element: (
         <Coin/>
        ),
      },
      {
        path: "/about",
        element: (
          <div>about page will appear here</div>
        ),
      },
      {
        path: "/wallet",
        element: (
         <WalletConnection/>
        ),
      },
        {
          path: "/counter",
          element: <Counter />,
        },
    ],
  },
]);
