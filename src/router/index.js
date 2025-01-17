import Login from "pages/Login/Login"
import React, { Suspense } from "react"
import PrivateRoute from "security/PrivateRoute";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CompanyIndex from "pages/CompanyPortal/CompanyIndex";
import InsertSheet from "pages/TimeSheets/InsertSheets";

const Featch = React.lazy(() => import('../pages/GetData/featch'));
const CreateData = React.lazy(() => import('../pages/Form/Creation/CreateData'));
const AccountDetails = React.lazy(()=> import('../component/AccountDetails/AccountDetails'))
const SuspenseWrapper = ({ children }) => {
    return (
        <Suspense fallback={'error'}>
            {children}
        </Suspense>
    )
}

    const userTypeLocal = localStorage.getItem('userType') 
    const userType =  userTypeLocal;
export const router = [
    {
        path: '/Login',
        element: <SuspenseWrapper><Login /></SuspenseWrapper>
    },
    
    {
        path: '/EmployeeData',
        element: (
            <PrivateRoute
                adminComponent={
                    <SuspenseWrapper>
                        <Featch />
                    </SuspenseWrapper>}>

            </PrivateRoute>

        )
    },

    {
        path: '/CreateData',
        element: (
            <PrivateRoute
            adminComponent={
                    <SuspenseWrapper>
                        <CreateData />
                    </SuspenseWrapper>}>
            </PrivateRoute>
        )
    },
    {
        path: '/EmployeeTomeSheet',
        element: (
            <PrivateRoute
            adminComponent={
                    <SuspenseWrapper>
                        <InsertSheet />
                    </SuspenseWrapper>}>
            </PrivateRoute>
        )
    },

    {
        path: '/AccountDetails',
        element: ( userType === 'user' ?
            <PrivateRoute
                userComponent={
                    <SuspenseWrapper>
                        <AccountDetails />
                    </SuspenseWrapper>
                    }
                    >
            </PrivateRoute> : <PrivateRoute
                adminComponent={
                    <SuspenseWrapper>
                        <AccountDetails />
                    </SuspenseWrapper>}>
            </PrivateRoute>
        )
    },  
    {
        path: '/',
        element: <Navigate to="/home" replace />
    },
    {
        path: '/home',
        element: ( userType === 'user' ?
            <PrivateRoute
            userComponent={
                    <SuspenseWrapper>
                        <CompanyIndex />
                    </SuspenseWrapper>}>
            </PrivateRoute> :  <PrivateRoute
            adminComponent={
                    <SuspenseWrapper>
                        <CompanyIndex />
                    </SuspenseWrapper>}>
            </PrivateRoute>
        )
    },
]