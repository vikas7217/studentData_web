import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Routes  from './router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout';
import ErrorBoundary from 'pages/ErroeBoundry/ErrorBoundry';
import Interceptor from 'component/Interceptors/Interceptors';

 

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
        children:Routes()
      }
    ]
  )

  return (
    <div className="App">
      <ToastContainer/>
      <Interceptor/>
      <RouterProvider router={routing} />
    </div>
  );
}

export default App;
