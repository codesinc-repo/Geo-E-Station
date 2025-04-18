// src/routes/index.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound/NotFound';

// Define your routes without a layout wrapper
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

// Export RouterProvider component with our routes
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;