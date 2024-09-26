import './App.css';
// import Featch from './pages/GetData/featch';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './pages/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Typography } from '@mui/material';
import Layout from './component/Layout';
// import ErrorBound from './pages/ErroeBoundry/ErrorBound';
import ErrorBoundary from 'pages/ErroeBoundry/ErrorBoundry';

 

function App() {

  const orgType = localStorage.getItem('userType')
  const routing = createBrowserRouter(
    [
      {
        path:'/',
        element: 
        <ErrorBoundary>

          <Layout orgType={orgType} />
        </ErrorBoundary>,
        // errorElement:<ErrorBound Error={ Error} />,
        children:router
      }
    ]
  )

  return (
    <div className="App">
      <ToastContainer/>
      <RouterProvider router={routing} />
    </div>
  );
}

export default App;
