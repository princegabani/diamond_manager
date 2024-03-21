import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import KapanPage from "./pages/KapanPage";
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import TaskPage from './pages/TaksPage';
import WorkerPage from './pages/WorkeraPage';
import EmployeePage from './pages/EmployeePage';
import store from './store/store';
import FinancePage from './pages/FinancePage';

// ----------------------------------------------------------------------

export default function Router() {
  const user = store.getState();
  console.log("user data in Routing page", user)
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'worker', element: <WorkerPage /> },
        { path: 'employee', element: <EmployeePage /> },
        { path: 'finance', element: <FinancePage /> },
        // { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },

        { path: 'kapan', element: <KapanPage /> },
        // { path: 'task', element: <TaskPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

// {
//   path: '/dashboard',
//     element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         { path: 'app', element: <DashboardAppPage /> },
//         { path: 'user', element: <UserPage /> },
//         // { path: 'products', element: <ProductsPage /> },
//         // { path: 'blog', element: <BlogPage /> },

//         // { path: 'kapan', element: <KapanPage /> },
//         // { path: 'task', element: <TaskPage /> },
//       ],
//     },
// {
//   path: 'login',
//     element: <LoginPage />,
//     },
// {
//   element: <SimpleLayout />,
//     children: [
//       { element: <Navigate to="/dashboard/app" />, index: true },
//       { path: '404', element: <Page404 /> },
//       { path: '*', element: <Navigate to="/404" /> },
//     ],
//     },
// {
//   path: '*',
//     element: <Navigate to="/404" replace />,
//     },