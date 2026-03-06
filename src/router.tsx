import { createBrowserRouter } from "react-router-dom";


import EmployeeLayout from "./fetaures/employees/pages/employeeLayout";
import LoginPage from "./fetaures/employees/pages/LoginPage";
import SignUPPage from "./fetaures/employees/pages/SignUPPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <EmployeeLayout />

    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/sign-up",
        element: <SignUPPage />
    },

]);


export default router;