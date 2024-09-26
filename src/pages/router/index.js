import Login from "pages/Login/Login"
import React, { Suspense } from "react"
import PrivateRoute from "security/PrivateRoute";
import { Navigate } from "react-router-dom";

const Featch = React.lazy(() => import('../GetData/featch'));
const CreateData = React.lazy(() => import('../Form/Creation/CreateData'));
const AccountDetails = React.lazy(()=> import('../../component/AccountDetails/AccountDetails'))
const SuspenseWrapper = ({ children }) => {
    return (
        <Suspense fallback={'error'}>
            {children}
        </Suspense>
    )
}

export const router = [
    {
        path: '/Login',
        element: <SuspenseWrapper><Login /></SuspenseWrapper>
    },
    
    {
        path: '/home',
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
        path: '/AccountDetails',
        element: (
            <PrivateRoute
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
    }
]