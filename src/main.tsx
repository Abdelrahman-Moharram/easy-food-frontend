import './index.css'
import "./i18n";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import CustomProvider from './redux/provider.tsx'
import Layout from './Pages/Layout.tsx'
import AuthenticatedOrRedirect from './Pages/Guards/AuthenticatedOrRedirect.tsx'
import Login from './Pages/Auth/Login.tsx'
import NotAuthenticatedOrRedirect from './Pages/Guards/NotAuthenticatedOrRedirect.tsx'
import Logout from './Pages/Auth/logout.tsx'
import NotFound from './Pages/Errors/NotFound.tsx'
import Settings from './Pages/Settings/index.tsx'
import UsersSettings from './Pages/Settings/users/index.tsx'
import RolesSettings from './Pages/Settings/roles/index.tsx'
import { IsAllowedPermissionOrRedirect } from './Pages/Guards/IsAllowedPermission.tsx'
import UploadsLayout from './Pages/Uploads/UploadsLayout.tsx';
import ManualUpload from './Pages/Uploads/ManualUpload.tsx';
import DailyUpload from './Pages/Uploads/DailyUpload.tsx';
import MonthlyUpload from './Pages/Uploads/MonthlyUpload.tsx';


const router = createBrowserRouter ([
  {
    path:"/",
    element:
      <AuthenticatedOrRedirect>
        <Layout />
      </AuthenticatedOrRedirect>,
    errorElement:(
    <AuthenticatedOrRedirect>
      <Layout>
        <NotFound />
      </Layout>
    </AuthenticatedOrRedirect>
    ),
    children:[
  
      {
        path:'/settings',
        children:[
          {
            index:true,
            element:<Settings />,
          },
          {
            path:'users',
            element:(
            <IsAllowedPermissionOrRedirect permission='permissions.users.view'>
              <UsersSettings />
            </IsAllowedPermissionOrRedirect>
            )
          },
          {
            path:'roles',
            element:
            (
              <IsAllowedPermissionOrRedirect permission='permissions.roles.view'>
                <RolesSettings />
              </IsAllowedPermissionOrRedirect>
            )

          },
          
         
          
        ]
      },
      {
        path:'/uploads',
        element:<UploadsLayout />,
        children:[
          {
            path:'manual',
            element:<ManualUpload />
          },
          {
            path:'daily',
            element:<DailyUpload />
          },
          {
            path:'monthly',
            element:<MonthlyUpload />
          },
        ]
      },
    ],

  },
  {
    path:'/auth',
    // element:<div dir='rtl'><Outlet /></div>,
    children:[
      {
        path:"logout",
        element:
        <AuthenticatedOrRedirect>
          <Logout />
        </AuthenticatedOrRedirect>
      },
      {
        path:"login",
        element:
        <NotAuthenticatedOrRedirect>
          <Login />
        </NotAuthenticatedOrRedirect>
      },
      // {
      //   path:"signup",
      //   element:
      //   <NotAuthenticatedOrRedirect>
      //     <SignUp />
      //   </NotAuthenticatedOrRedirect>
      // }
    ]
  },
      
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider>
      <RouterProvider router={router} />
    </CustomProvider>
  </StrictMode>,
)
