import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Babys, Login, PlayingRecord, Records } from "./views";
import { DefaultLayout, LoggedLayout } from "./layouts";
import { BabyProvider } from "./contexts";

export const routes = {
    login: "/login",
    logged: "/sistema",
    listBabys: "/sistema/bebes",
    listRecords: "/sistema/gravacoes",
    playingRecord: "/sistema/gravacao/:id",
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
                {
                    path: routes.listBabys,
                    element: (
                        <BabyProvider>
                            <Babys />
                        </BabyProvider>
                    ),
                },
                { path: routes.listRecords, element: <Records /> },
                { path: routes.playingRecord, element: <PlayingRecord /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
