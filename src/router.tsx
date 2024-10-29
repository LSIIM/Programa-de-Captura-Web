import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Patients, CreateRecord, Login, PlayingRecord, Recordings } from "./views";
import { DefaultLayout, LoggedLayout } from "./layouts";

export const routes = {
    login: "/login",
    logged: "/sistema",
    listBabys: "/sistema/bebes",
    listRecords: "/sistema/gravacoes",
    playingRecord: "/sistema/gravacao/:id",
    createRecord: "/sistema/gravar",
};

export default function Router() {
    const router = createBrowserRouter([
        { path: "*", element: <Navigate to={routes.login} /> },
        {
            path: routes.login,
            element: (
                <DefaultLayout>
                    <Login />
                </DefaultLayout>
            ),
        },
        {
            path: routes.logged,
            element: <LoggedLayout children={<Outlet />} />,
            children: [
                { index: true, element: <Navigate to={routes.listBabys} /> },
                { path: routes.listBabys, element: <Patients /> },
                { path: routes.listRecords, element: <Recordings /> },
                { path: routes.playingRecord, element: <PlayingRecord /> },
                { path: routes.createRecord, element: <CreateRecord /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
