import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Babys, Login, Records } from "./views";
import { LoggedLayout } from "./layouts";

export const routes = {
    login: "/login",

    logged: "/sistema",
    listBabys: "/sistema/bebes",
    listRecords: "/sistema/gravacoes",
};

export default function Router() {
    const router = createBrowserRouter([
        { path: "*", element: <Navigate to={routes.login} /> },
        { path: routes.login, element: <Login /> },
        {
            path: routes.logged,
            element: <LoggedLayout children={<Outlet />} />,
            children: [
                { index: true, element: <Navigate to={routes.listBabys} /> },
                { path: routes.listBabys, element: <Babys /> },
                { path: routes.listRecords, element: <Records /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
