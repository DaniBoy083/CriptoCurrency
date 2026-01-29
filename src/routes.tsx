import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";
import { DetailPage } from "./pages/detail";
import { NotFoundPage } from "./pages/notfound";

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/detail/:cripto",
                element: <DetailPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export {router};